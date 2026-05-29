---
name: design-check
description: "현재 diff 또는 지정 파일을 디자인 시스템 Do/Don't 체크리스트로 리뷰한다"
argument-hint: <파일 경로 또는 비워두면 현재 diff 전체>
---

# Design Check

## 동작

`$ARGUMENTS`로 파일 경로를 받는다. 비어있으면 `git diff HEAD`의 변경 파일 전체를 대상으로 한다.

## 실행 절차

### 1. 대상 파일 수집

```bash
# 인자가 있으면 해당 파일, 없으면 변경된 tsx/ts/css 파일
if [ -n "$ARGUMENTS" ]; then
  FILES="$ARGUMENTS"
else
  FILES=$(git diff --name-only HEAD | grep -E '\.(tsx?|css)$' | grep -v node_modules)
fi
```

### 2. dont.md 패턴 대조

`docs/design-system/dont.md`의 GREP 패턴 항목을 기준으로 각 파일을 검사한다.

검사 항목:

- hex 하드코딩 (`#[0-9A-Fa-f]{3,6}`)
- 강한 그림자 (`shadow-xl|shadow-2xl`)
- 임의 픽셀 간격 (`[mp][tblrxy]?-\[\d+px\]`)
- 스케일 외 폰트 크기 (`text-\[\d+px\]`)
- bounce 이징 (`cubic-bezier\(0\.34`)
- border 직접 색상 (`border-(black|gray|slate|zinc|neutral|stone)-`)
- transition:all

### 3. do.md 체크리스트 대조

`docs/design-system/do.md` 기준으로 누락된 처리를 확인한다:

- 라이트/다크 모드 쌍 여부
- prefers-reduced-motion 대응 여부
- 외부 링크 rel="noreferrer" 여부

### 4. 리뷰 결과 출력

```
## Design Check 결과

### 위반 사항
| 파일 | 라인 | 규칙 | 내용 |
|------|------|------|------|
| ... | ... | ... | ... |

### 주의 사항
- ...

### 통과
- ...
```

위반이 없으면 `✅ Design System 규칙 통과` 출력.
