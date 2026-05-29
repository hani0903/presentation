export const INTRO_MESSAGE = "프론트엔드 학습을 더 효율적으로";

export interface DocLink {
  name: string;
  description: string;
  url: string;
}

export const DOC_LINKS: DocLink[] = [
  {
    name: "MDN Web Docs",
    description: "웹 표준 레퍼런스",
    url: "https://developer.mozilla.org",
  },
  {
    name: "React 공식 문서",
    description: "React 공식 가이드",
    url: "https://react.dev",
  },
  {
    name: "TypeScript 공식 문서",
    description: "타입 시스템 레퍼런스",
    url: "https://www.typescriptlang.org/docs",
  },
  {
    name: "JavaScript 모던 튜토리얼",
    description: "JS 심화 학습 자료",
    url: "https://ko.javascript.info",
  },
];
