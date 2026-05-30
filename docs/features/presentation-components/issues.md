# 이슈 분해 — 프레젠테이션 컴포넌트 시스템

> 수직 슬라이스 원칙: 각 이슈 완료 시 슬라이드에서 실제로 확인할 수 있는 동작이 있어야 한다.

---

## 의존성 순서

```
Issue 1 (타입 마이그레이션 + ContentBlockRenderer + BulletList)
  → Issue 2 (Typography + Inline 컴포넌트)
    → Issue 3 (Callout + CodeBlock + text-code-display 토큰)
      → Issue 4 (Table + FlowDiagram + ProcessTemplate 리팩토링)
        → Issue 5 (ComparePanel + ImagePanel)
```

---

## Issue 1 — 타입 마이그레이션 + ContentBlockRenderer + BulletList

**완료 시 보여줄 동작**: ContentSlide 5장(2·3·5·6·10)이 기존과 동일하게 렌더링된다. 데이터 구조만 `bullets[]` → `body: [{ kind: "bullets", items }]`로 교체되고 화면 동작은 그대로.

### 작업 범위

| 파일                                                  | 작업                                                                                                                 |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `entities/slide/model/types.ts`                       | `ContentBlock` Union · `FlowStep` · `CompareColumn` 타입 추가. `ContentSlide.bullets` → `.body: ContentBlock[]` 교체 |
| `entities/slide/model/constants.ts`                   | ContentSlide 5장의 `bullets` → `body: [{ kind: "bullets", items }]` 마이그레이션                                     |
| `entities/slide/ui/content/BulletList.tsx`            | 신규 — `items: string[]` 렌더링                                                                                      |
| `entities/slide/ui/ContentBlockRenderer.tsx`          | 신규 — `kind: "bullets"` case + 기본 fallback                                                                        |
| `widgets/slide-deck/ui/templates/ContentTemplate.tsx` | `bullets` 직접 렌더링 → `ContentBlockRenderer` 위임으로 교체                                                         |
| `entities/slide/index.ts`                             | `ContentBlock` 관련 타입 barrel export 추가                                                                          |

### Acceptance Criteria

- [ ] Given ContentSlide 데이터가 `body: [{ kind: "bullets", items }]` 구조일 때, When `/harness`에서 해당 슬라이드를 보면, Then 기존과 동일하게 bullet 목록이 렌더링된다
- [ ] Given `kind`가 `"bullets"`가 아닌 ContentBlock이 있을 때, When ContentBlockRenderer가 처리하면, Then TypeScript 에러 없이 fallback이 렌더링된다
- [ ] Given `tsc --noEmit`을 실행하면, Then 타입 에러 0건

---

## Issue 2 — Typography + Inline 컴포넌트

**완료 시 보여줄 동작**: ContentSlide에 `Heading` · `Body` · `Highlight` · `InlineCode`를 블록으로 삽입해 슬라이드에서 확인할 수 있다.

**의존성**: Issue 1 완료 후 진행

### 작업 범위

| 파일                                          | 작업                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| `entities/slide/ui/typography/Display.tsx`    | 신규 — `text-display-1`, `as: keyof JSX.IntrinsicElements`, default `"h1"` |
| `entities/slide/ui/typography/Heading.tsx`    | 신규 — `text-heading-2`, default `"h2"`                                    |
| `entities/slide/ui/typography/Subheading.tsx` | 신규 — `text-heading-4`, default `"h3"`                                    |
| `entities/slide/ui/typography/Body.tsx`       | 신규 — `text-body-2`, default `"p"`                                        |
| `entities/slide/ui/inline/Highlight.tsx`      | 신규 — plain text, primary 색상 + font-bold                                |
| `entities/slide/ui/inline/InlineCode.tsx`     | 신규 — plain text, font-mono + primary-100 배경                            |
| `entities/slide/ui/ContentBlockRenderer.tsx`  | `"heading"` · `"body"` · `"highlight"` · `"inline-code"` case 추가         |
| `entities/slide/model/types.ts`               | ContentBlock에 heading · body · highlight · inline-code kind 추가          |
| `entities/slide/model/constants.ts`           | 검증용 슬라이드 1장에 typography/inline 블록 추가 (실제 발표 내용 반영)    |

### Acceptance Criteria

- [ ] Given `{ kind: "heading", text, as? }` 블록이 있을 때, When 슬라이드에 렌더링되면, Then `text-heading-2` 스타일의 텍스트가 표시된다
- [ ] Given `{ kind: "highlight", text }` 블록이 있을 때, When 렌더링되면, Then primary 색상 + bold 텍스트가 표시된다
- [ ] Given `{ kind: "inline-code", text }` 블록이 있을 때, When 렌더링되면, Then font-mono + primary-100 배경으로 표시된다
- [ ] Given `as="section"`이 전달될 때, When Typography 컴포넌트가 렌더링되면, Then `<section>` 태그로 렌더링된다

---

## Issue 3 — Callout + CodeBlock + text-code-display 토큰

**완료 시 보여줄 동작**: ContentSlide에 Callout(info · success · warning)과 CodeBlock을 삽입해 슬라이드에서 확인할 수 있다.

**의존성**: Issue 2 완료 후 진행

### 작업 범위

| 파일                                         | 작업                                                                                          |
| -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/app/styles/index.css`                   | `@theme`에 `text-code-display` 토큰 추가 (15px · JetBrains Mono · line-height 1.6)            |
| `entities/slide/ui/content/Callout.tsx`      | 신규 — info/success/warning variant, plain text, 아이콘 + 배경색                              |
| `entities/slide/ui/content/CodeBlock.tsx`    | 신규 — 디자인 가독성: primary-100 border-l, surface-container-highest 배경, text-code-display |
| `entities/slide/ui/ContentBlockRenderer.tsx` | `"callout"` · `"code"` case 추가                                                              |
| `entities/slide/model/types.ts`              | ContentBlock에 callout · code kind 추가 (이미 정의됐으면 확인만)                              |
| `entities/slide/model/constants.ts`          | 검증용 슬라이드에 Callout · CodeBlock 블록 추가                                               |

### Acceptance Criteria

- [ ] Given `{ kind: "callout", variant: "info", text }` 블록이 있을 때, When 렌더링되면, Then info 스타일(primary 계열 배경 + 아이콘)로 표시된다
- [ ] Given `{ kind: "callout", variant: "success" }` 블록이 있을 때, When 렌더링되면, Then green 계열 배경으로 표시된다
- [ ] Given `{ kind: "callout", variant: "warning" }` 블록이 있을 때, When 렌더링되면, Then orange 계열 배경으로 표시된다
- [ ] Given `{ kind: "code", lang: "ts", code }` 블록이 있을 때, When 렌더링되면, Then `surface-container-highest` 배경 + `border-l-4 border-primary-300` + `text-code-display` 폰트로 표시된다
- [ ] Given `text-code-display` 클래스를 사용하면, Then `@theme` 토큰이 적용된 15px JetBrains Mono 폰트가 렌더링된다

---

## Issue 4 — Table + FlowDiagram + ProcessTemplate 리팩토링

**완료 시 보여줄 동작**: ContentSlide에 Table과 FlowDiagram을 삽입할 수 있다. ProcessSlide(7번)가 FlowDiagram을 내부적으로 사용해 동일하게 렌더링된다.

**의존성**: Issue 3 완료 후 진행

### 작업 범위

| 파일                                                  | 작업                                                                    |
| ----------------------------------------------------- | ----------------------------------------------------------------------- |
| `entities/slide/ui/content/Table.tsx`                 | 신규 — `headers: string[]` + `rows: string[][]`                         |
| `entities/slide/ui/content/FlowDiagram.tsx`           | 신규 — vertical/horizontal direction, flex-wrap, ProcessArrow 내부 흡수 |
| `widgets/slide-deck/ui/ProcessArrow.tsx`              | 삭제 — FlowDiagram 내부로 흡수                                          |
| `widgets/slide-deck/ui/templates/ProcessTemplate.tsx` | `FlowDiagram` 사용으로 리팩토링                                         |
| `entities/slide/ui/ContentBlockRenderer.tsx`          | `"table"` · `"flow"` case 추가                                          |
| `entities/slide/model/constants.ts`                   | 검증용 슬라이드에 Table · FlowDiagram 블록 추가                         |

### Acceptance Criteria

- [ ] Given `{ kind: "table", headers, rows }` 블록이 있을 때, When 렌더링되면, Then 헤더행 + 데이터행이 표 형태로 표시된다
- [ ] Given `{ kind: "flow", steps, direction: "vertical" }` 블록이 있을 때, When 렌더링되면, Then steps가 ↓ 화살표와 함께 세로로 표시된다
- [ ] Given `{ kind: "flow", steps, direction: "horizontal" }` 블록이 있을 때, When 렌더링되면, Then steps가 → 화살표와 함께 가로로 표시된다
- [ ] Given horizontal FlowDiagram의 steps가 부모 너비를 초과할 때, When 렌더링되면, Then `flex-wrap`으로 자연스럽게 줄바꿈된다
- [ ] Given ProcessSlide 7번이 있을 때, When `/harness`에서 7번 슬라이드를 보면, Then 리팩토링 전과 동일하게 렌더링된다

---

## Issue 5 — ComparePanel + ImagePanel

**완료 시 보여줄 동작**: ContentSlide에 ComparePanel · ImagePanel을 삽입해 슬라이드에서 확인할 수 있다. 전체 13개 컴포넌트 완성.

**의존성**: Issue 4 완료 후 진행

### 작업 범위

| 파일                                         | 작업                                                           |
| -------------------------------------------- | -------------------------------------------------------------- |
| `entities/slide/ui/content/ComparePanel.tsx` | 신규 — `left: CompareColumn` · `right: CompareColumn` 좌우 2열 |
| `entities/slide/ui/content/ImagePanel.tsx`   | 신규 — `src` · `alt` · `caption?`                              |
| `entities/slide/ui/ContentBlockRenderer.tsx` | `"compare"` · `"image"` case 추가                              |
| `entities/slide/model/constants.ts`          | 검증용 슬라이드에 ComparePanel · ImagePanel 블록 추가          |
| `entities/slide/index.ts`                    | 전체 컴포넌트 barrel export 정리                               |

### Acceptance Criteria

- [ ] Given `{ kind: "compare", left, right }` 블록이 있을 때, When 렌더링되면, Then 좌우 두 열이 나란히 표시된다
- [ ] Given `{ kind: "image", src, alt }` 블록이 있을 때, When 렌더링되면, Then 이미지가 표시된다
- [ ] Given `{ kind: "image", src, alt, caption }` 블록이 있을 때, When 렌더링되면, Then 이미지 아래에 caption 텍스트가 표시된다
- [ ] Given 전체 13개 컴포넌트 구현 완료 후 `tsc --noEmit`을 실행하면, Then 타입 에러 0건
