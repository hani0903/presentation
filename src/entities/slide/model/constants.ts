import type { Slide } from "./types";

export const SLIDES: Slide[] = [
  // ── 1P. 시작 페이지 ────────────────────────────────────────────────────────
  {
    id: 1,
    type: "cover",
    title: "Claude Harness를 활용한\nAI 개발 워크플로우 구축",
    subtitle:
      "Spec → PRD → ADR → 구현 검증까지\nAI와 함께 반복 가능한 개발 프로세스 만들기",
    presenter: "모리 / 조하은 · CMC Web 파트",
  },

  // ── 2P. 왜 관심을 가지게 됐나 ───────────────────────────────────────────────
  {
    id: 2,
    type: "content",
    chapter: "01. 배경",
    title: "AI에게 같은 말을 반복하고 있었다",
    body: [
      {
        kind: "code",
        lang: "text",
        code: "TypeScript로 작성해줘\nFSD 구조 지켜줘\nTailwind 사용해줘\n테스트 해줘\n커밋 메시지 작성해줘",
      },
      {
        kind: "callout",
        variant: "warning",
        text: "규칙 누락 · 아키텍처 일관성 저하 · 품질 편차 발생",
      },
      {
        kind: "callout",
        variant: "info",
        text: "AI를 더 잘 쓰는 방법은 없을까?",
      },
    ],
  },

  // ── 3P. Harness란? ──────────────────────────────────────────────────────────
  {
    id: 3,
    type: "content",
    chapter: "01. 배경",
    title: "Harness란?",
    body: [
      {
        kind: "callout",
        variant: "info",
        text: "말의 힘을 안전하게 제어하고 유용한 방향으로 이끌기 위한 도구 — AI 또한 강력하지만 방치하면 예측 불가능하게 작동합니다.",
      },
      {
        kind: "flow",
        steps: [
          { label: "강력한 AI" },
          { label: "Harness" },
          { label: "예측 가능한 개발 프로세스" },
        ],
        direction: "horizontal",
      },
      {
        kind: "body",
        text: "→ AI 에이전트가 안전하고 예측 가능한 방식으로 작동하도록 설계된 제어 구조 전체",
      },
    ],
  },

  // ── 4P. CLAUDE.md ───────────────────────────────────────────────────────────
  {
    id: 4,
    type: "content",
    chapter: "02. 내가 구축하고 있는 Harness",
    title: "CLAUDE.md",
    body: [
      {
        kind: "callout",
        variant: "info",
        text: "세션 시작 시 자동으로 로드되는 프로젝트 규칙집",
      },
      {
        kind: "code",
        lang: "md",
        code: "## FSD 아키텍처\npages(4) → widgets(3) → features(2) → entities(1) → shared(0)\n\n## Design System\nUI·CSS 작업 시 `design-system` skill 트리거\n\n## Code Style\nnamed export만 · default export 금지 · import type 강제",
      },
      {
        kind: "bullets",
        items: [
          "FSD 레이어 규칙 — import 방향 자동 적용",
          "Design System 연결 — UI 작업 시 skill 자동 트리거",
          "기술 스택 명시 — 매 세션마다 반복 설명 불필요",
        ],
      },
    ],
  },

  // ── 5P. Design System + Skills ─────────────────────────────────────────────
  {
    id: 5,
    type: "content",
    chapter: "02. 내가 구축하고 있는 Harness",
    title: "Design System + Skills",
    body: [
      {
        kind: "flow",
        steps: [
          { label: "Figma Stitch", description: "design.md 추출" },
          {
            label: "docs/design-system/",
            description: "color · typography · spacing · elevation",
          },
          { label: "SKILL.md", description: "AI 작업 전 컨텍스트 로드" },
          { label: "PostToolUse 훅", description: "저장 시 위반 자동 감지" },
        ],
        direction: "horizontal",
      },
      {
        kind: "callout",
        variant: "success",
        text: "문서 구조화 완료 · Skill 구축 완료 / Storybook 자동화는 다음 단계",
      },
    ],
  },

  // ── 6P. Feature Planning Workflow ──────────────────────────────────────────
  {
    id: 6,
    type: "process",
    title: "기능 개발 프로세스 구조화",
    steps: [
      { label: "spec-original", description: "초기 기능 정의서" },
      { label: "Spec Interview", description: "1문1답 · 추천 이유 포함" },
      { label: "spec-fixed", description: "확정된 요구사항" },
      { label: "PRD + ADR", description: "사용자 스토리 · 기술 결정 4요소" },
      {
        label: "Issue 분해",
        description: "수직 슬라이스 · Given-When-Then AC",
      },
      { label: "구현", description: "이슈 순서대로" },
      { label: "Playwright 검증", description: "동작 확인 후 커밋" },
    ],
  },

  // ── 7P. 현재까지와 앞으로 ──────────────────────────────────────────────────
  {
    id: 7,
    type: "split",
    title: "현재까지 / 앞으로",
    left: {
      heading: "현재 검증 완료",
      bullets: [
        "CLAUDE.md 기반 FSD 룰셋",
        "Design System 문서화 + Skill",
        "Spec Interview",
        "PRD + ADR",
        "Issue 분해",
        "구현",
        "Playwright 검증",
      ],
    },
    right: {
      heading: "다음 실험 계획",
      bullets: [
        "Design.md 기반 컴포넌트 자동 생성",
        "Storybook 문서 자동화",
        "AC 기반 TDD 자동화",
      ],
    },
  },

  // ── 8P. 다음에 해보고 싶은 것 ──────────────────────────────────────────────
  {
    id: 8,
    type: "content",
    chapter: "03. 다음 단계",
    title: "다음에 해보고 싶은 것",
    body: [
      {
        kind: "table",
        headers: ["주제", "흐름", "관심 포인트"],
        rows: [
          [
            "Design.md 기반\n컴포넌트 생성",
            "Figma → Stitch → design.md → Claude → Component",
            "디자인 의도 손실 최소화 · 토큰 자동 반영",
          ],
          [
            "Storybook\n문서 자동화",
            "Component → Storybook → 문서화",
            "컴포넌트 재사용성 · 협업 효율",
          ],
          [
            "AC 기반 TDD",
            "Issue → AC → Test → Implement",
            "Red → Green → Refactor 자동화 가능성",
          ],
        ],
      },
    ],
  },
];
