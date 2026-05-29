import type { Slide } from "./types";

export const SLIDES: Slide[] = [
  {
    id: 1,
    title: "문제 제기",
    bullets: [
      "Figma 디자인 → 코드 구현 사이의 반복 작업",
      "디자인 시스템 토큰이 코드에 일관되게 반영되지 않음",
      "컴포넌트마다 같은 패턴을 다시 작성하는 비용",
    ],
  },
  {
    id: 2,
    title: "제안하는 파이프라인",
    bullets: [
      "Figma → Design Token → Component → Storybook → Git",
      "Claude Code Harness가 각 단계를 자동화",
      "CLAUDE.md 룰셋으로 품질 게이트 자동 적용",
    ],
  },
  {
    id: 3,
    title: "각 기술 소개",
    bullets: [
      "Figma — 디자인 소스 및 토큰 관리",
      "Claude Code Harness — AI 기반 컴포넌트 코드 생성",
      "Storybook — 컴포넌트 문서화 및 시각적 검증",
      "Husky — 커밋 단계 품질 게이트",
    ],
  },
  {
    id: 4,
    title: "현재 구현된 것",
    bullets: [
      "이 발표 앱 자체를 Harness로 구현",
      "CLAUDE.md 기반 FSD 아키텍처 룰셋 자동 적용",
      "디자인 시스템 토큰 위반 자동 감지 훅",
      "Husky + commitlint 커밋 컨벤션 가드",
    ],
  },
  {
    id: 5,
    title: "도전해보고 싶은 것",
    bullets: [
      "Figma Token Studio 연동으로 토큰 자동 동기화",
      "Storybook 스토리 자동 생성",
      "컴포넌트 단위 스냅샷 테스트 자동화",
      "슬라이드 콘텐츠 CMS 기반 관리",
    ],
  },
  {
    id: 6,
    title: "기대 효과",
    bullets: [
      "디자인-개발 피드백 사이클 단축",
      "디자인 시스템 일관성 자동 유지",
      "반복 작업 제거로 창의적 작업에 집중",
    ],
  },
  {
    id: 7,
    title: "한 줄 요약",
    bullets: [
      '"Figma에서 Git까지, AI가 연결한다"',
      "Claude Code Harness = 개발 자동화의 새로운 가능성",
    ],
  },
];
