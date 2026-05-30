# 프레젠테이션 컴포넌트 시스템 — 확정 스펙

> spec-original.md 기반 인터뷰(Q1~Q5)를 통해 확정된 요구사항.

---

## 확정된 기술 결정 (Q&A 요약)

| #   | 질문                           | 결정                                                                                |
| --- | ------------------------------ | ----------------------------------------------------------------------------------- |
| Q1  | 슬라이드와의 연결 방식         | ContentBlock 배열 — ContentSlide.body를 `ContentBlock[]`으로 교체                   |
| Q2  | 구현 범위                      | 13개 전체 구현                                                                      |
| Q3  | CodeBlock 하이라이팅           | 없음 — 디자인(배경·대비·패딩)으로 가독성 확보                                       |
| Q4  | FSD 배치                       | `entities/slide/ui/` — 발표 도메인 표시 컴포넌트                                    |
| Q5  | FlowDiagram vs ProcessTemplate | FlowDiagram이 ProcessTemplate 내부를 대체 + direction 지원 + 부모 너비 초과 시 wrap |

---

## ContentBlock 타입 시스템

### 기존 ContentSlide 변경

```ts
// Before
type ContentSlide = {
  type: "content";
  id: number;
  chapter: string;
  title: string;
  bullets: string[]; // ← 제거
};

// After
type ContentSlide = {
  type: "content";
  id: number;
  chapter: string;
  title: string;
  body: ContentBlock[]; // ← 교체
};
```

### ContentBlock Discriminated Union

```ts
type ContentBlock =
  | { kind: "bullets"; items: string[] }
  | { kind: "ordered"; items: string[] }
  | { kind: "callout"; variant: "info" | "success" | "warning"; text: string }
  | { kind: "code"; lang: "text" | "md" | "js" | "ts"; code: string }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "flow"; steps: FlowStep[]; direction?: "vertical" | "horizontal" }
  | { kind: "compare"; left: CompareColumn; right: CompareColumn }
  | { kind: "image"; src: string; alt: string; caption?: string };
```

### 마이그레이션

기존 `bullets: string[]` → `body: [{ kind: "bullets", items: [...] }]` 로 일괄 교체.

---

## 컴포넌트 목록 및 배치

```
entities/slide/
├── model/
│   ├── types.ts        (ContentBlock 타입 추가)
│   └── constants.ts    (SLIDES body 마이그레이션)
├── ui/
│   ├── typography/
│   │   ├── Display.tsx
│   │   ├── Heading.tsx
│   │   ├── Subheading.tsx
│   │   └── Body.tsx
│   ├── inline/
│   │   ├── Highlight.tsx
│   │   └── InlineCode.tsx
│   ├── content/
│   │   ├── BulletList.tsx
│   │   ├── OrderedList.tsx
│   │   ├── Callout.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── Table.tsx
│   │   ├── FlowDiagram.tsx   ← ProcessArrow 흡수, direction + wrap 지원
│   │   ├── ComparePanel.tsx
│   │   └── ImagePanel.tsx
│   └── ContentBlockRenderer.tsx  ← kind로 분기해 컴포넌트 선택
└── index.ts
```

### ContentBlockRenderer

`ContentTemplate` 내부에서 `body: ContentBlock[]`를 받아 각 블록을 렌더링하는 dispatcher.

```tsx
// ContentTemplate.tsx 변경 후
<div className="flex flex-col gap-4">
  {body.map((block, i) => (
    <ContentBlockRenderer key={`${block.kind}-${i}`} block={block} />
  ))}
</div>
```

---

## FlowDiagram 상세 스펙

### 타입

```ts
type FlowStep = {
  label: string;
  description?: string;
};

type FlowDiagramProps = {
  steps: FlowStep[];
  direction?: "vertical" | "horizontal"; // default: "vertical"
};
```

### 동작

- **vertical**: 기존 ProcessTemplate 동작과 동일. steps 사이에 `↓` 화살표.
- **horizontal**: steps를 가로로 나열, `→` 화살표. 부모 너비 초과 시 `flex-wrap`으로 자연스럽게 줄바꿈. 줄바꿈 위치에 따른 화살표 방향 변경은 이번 범위 제외 — 화살표는 마지막 항목 제외 일관되게 표시.
- `ProcessArrow` 컴포넌트는 FlowDiagram 내부로 흡수 (외부 노출 없음).

### ProcessTemplate 리팩토링

```tsx
// ProcessTemplate.tsx 변경 후
export const ProcessTemplate = ({ title, steps }: ProcessSlide) => (
  <div className="flex h-full w-full flex-col gap-6 px-16 py-12">
    <h2 className="text-heading-3 text-on-surface">{title}</h2>
    <FlowDiagram steps={steps} direction="vertical" />
  </div>
);
```

---

## CodeBlock 디자인 스펙 (하이라이팅 없음)

가독성을 디자인으로 확보:

- 배경: `bg-surface-container-highest` (가장 어두운 surface)
- 텍스트: `text-on-surface` (최고 대비)
- 폰트: `font-mono` + `text-code-display` (`--text-code-display` 토큰 — `@theme`에 추가 필요)
- 좌측 border accent: `border-l-4 border-primary-300`
- 패딩: `px-6 py-5`
- 언어 레이블: 우상단에 `text-caption text-on-surface-variant` 으로 표시
- `rounded-2xl`

> `text-code-display` 토큰은 `src/app/styles/index.css`의 `@theme` 블록에 추가한다.

---

## 기존 슬라이드 마이그레이션 대상

`constants.ts`에서 `bullets: string[]`를 `body: ContentBlock[]`로 교체:

| 슬라이드         | 마이그레이션 내용                                       |
| ---------------- | ------------------------------------------------------- |
| 2, 3, 5, 6, 10   | `bullets` → `body: [{ kind: "bullets", items: [...] }]` |
| 7 (ProcessSlide) | 변경 없음 — ProcessSlide 타입은 별도 유지               |

---

## Out of Scope

- 문법 하이라이팅 (CodeBlock)
- BulletList · OrderedList · Callout 텍스트의 rich text 조합 (Highlight · InlineCode 인라인 삽입)
- FlowDiagram horizontal wrap 시 줄바꿈 위치에 따른 화살표 방향 변경
- Storybook 문서화
- MDX 렌더러
- CMS 연동
- 콘텐츠 편집기
- 발표자 모드 / Speaker Note

---

## 용어 정의

| 용어                     | 정의                                                              |
| ------------------------ | ----------------------------------------------------------------- |
| **ContentBlock**         | ContentSlide의 body를 구성하는 단위. `kind` 필드로 타입 구분      |
| **ContentBlockRenderer** | `kind`로 분기해 적절한 컴포넌트를 선택하는 dispatcher             |
| **FlowDiagram**          | 단계적 흐름을 화살표로 표현하는 컴포넌트. direction으로 방향 제어 |
| **FlowStep**             | FlowDiagram의 단계 단위. `label`(필수) + `description`(선택)      |
| **Highlight**            | 인라인 강조 텍스트. Primary 색상 + Bold                           |
| **InlineCode**           | 인라인 코드. Monospace + Primary 계열 배경                        |
| **Callout**              | 강조 정보 블록. info · success · warning 3가지 variant            |
