import { readFileSync } from "fs"

let raw = ""
process.stdin.setEncoding("utf8")
process.stdin.on("data", (chunk) => (raw += chunk))
process.stdin.on("end", () => {
	let data
	try {
		data = JSON.parse(raw)
	} catch {
		process.exit(0)
	}

	const filePath = data.tool_input?.file_path ?? data.tool_input?.path
	if (!filePath) process.exit(0)
	if (!filePath.match(/\.(tsx?|css)$/)) process.exit(0)
	if (filePath.includes("node_modules") || filePath.includes("@generated")) process.exit(0)

	let content
	try {
		content = readFileSync(filePath, "utf8")
	} catch {
		process.exit(0)
	}

	const violations = []
	const lines = content.split("\n")

	const isComment = (line) => {
		const t = line.trim()
		return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || t.startsWith("#")
	}

	lines.forEach((line, i) => {
		const ln = i + 1
		if (isComment(line)) return

		// 임의 hex 하드코딩
		if (/#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b/.test(line)) {
			violations.push(`L${ln} [Color] hex 하드코딩 → CSS 변수(--color-*) 사용 | ${line.trim()}`)
		}

		// 강한 그림자
		if (/shadow-(xl|2xl|3xl)/.test(line)) {
			violations.push(`L${ln} [Shadow] shadow-xl/2xl/3xl 금지 → shadow-card / shadow-floating 사용`)
		}

		// 인라인 box-shadow
		if (/box-shadow\s*:/.test(line)) {
			violations.push(`L${ln} [Shadow] box-shadow 하드코딩 금지 → shadow-card / shadow-floating 사용`)
		}

		// 임의 픽셀 spacing
		if (/[mp][tblrxy]?-\[\d+px\]/.test(line)) {
			violations.push(`L${ln} [Spacing] 임의 픽셀 간격 금지 → gap 스케일(0.5/1/1.5/2/3/4rem) 사용`)
		}

		// 임의 폰트 크기 (허용 크기 외)
		const fontMatch = line.match(/text-\[(\d+)px\]/)
		if (fontMatch) {
			const allowed = [60, 40, 36, 28, 20, 16, 14, 12]
			if (!allowed.includes(Number(fontMatch[1]))) {
				violations.push(`L${ln} [Typography] text-[${fontMatch[1]}px] 금지 → 허용: 60/40/36/28/20/16/14/12px`)
			}
		}

		// bounce/spring 이징
		if (/cubic-bezier\(0\.34/.test(line)) {
			violations.push(`L${ln} [Motion] bounce/spring 이징 금지 → cubic-bezier(0.2,0,0,1) 사용`)
		}

		// 500ms 이상 transition duration
		const durationMatch = line.match(/duration-\[(\d+)ms\]/)
		if (durationMatch && Number(durationMatch[1]) >= 500) {
			violations.push(`L${ln} [Motion] ${durationMatch[1]}ms 금지 → 최대 360ms`)
		}

		// transition: all
		if (/transition:\s*all/.test(line)) {
			violations.push(`L${ln} [Motion] transition:all 금지 → 필요한 속성만 명시`)
		}

		// border-{color} 유틸 (Ghost Border 외 선 금지)
		if (/border-(black|gray|slate|zinc|neutral|stone)-/.test(line)) {
			violations.push(`L${ln} [Elevation] border 직접 색상 금지 → Ghost Border(border-[var(--outline-variant)]) 사용`)
		}
	})

	if (violations.length > 0) {
		process.stderr.write(`\n⚠️  Design System 위반 감지 (${filePath})\n`)
		process.stderr.write("─".repeat(60) + "\n")
		violations.forEach((v) => process.stderr.write(`  ${v}\n`))
		process.stderr.write("─".repeat(60) + "\n")
		process.stderr.write("  → docs/design-system/dont.md 참조\n\n")
	}
})