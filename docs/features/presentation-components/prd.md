# PRD — 프레젠테이션 컴포넌트 시스템

---

## 개요

### 목적

슬라이드 레이아웃과 콘텐츠를 분리한다. 콘텐츠는 `ContentBlock[]` 데이터로 표현하고, Presentation Component가 이를 렌더링한다. 13개 컴포넌트를 `entities/slide/ui/`에 구축하고, 기존 ContentSlide의 `bullets` 구조를 `body: ContentBlock[]`로 마이그레이션한다.

### 배경

기존 `ContentSlide = { bullets: string[] }` 구조는 BulletList 외 다른 콘텐츠 타입(Callout · CodeBlock · Table 등)을 슬라이드에 담을 수 없다. Presentation Component System을 도입해 슬라이드 데이터가 어떤 콘텐츠 블록도 조합할 수 있는 구조로 전환한다.

### 성공 기준

- 13개 Presentation Component가 `entities/slide/ui/`에 구현된다
- `ContentSlide.body: ContentBlock[]`로 데이터 구조가 교체되고 기존 10장이 마이그레이션된다
- `ContentTemplate`이 `ContentBlockRenderer`를 통해 모든 블록 타입을 렌더링한다
- `ProcessTemplate`이 `FlowDiagram`을 내부적으로 사용하도록 리팩토링된다
- `text-code-display` 토큰이 `@theme`에 추가된다

---

## 사용자 스토리

| ID    | 스토리                                                                                           |
| ----- | ------------------------------------------------------------------------------------------------ |
| US-01 | 발표자로서 ContentSlide에 BulletList · Callout · CodeBlock을 조합해 넣을 수 있다                 |
| US-02 | 발표자로서 Callout으로 info · success · warning 세 가지 강조 블록을 표현할 수 있다               |
| US-03 | 발표자로서 CodeBlock으로 코드를 명확하게 표시할 수 있다 (하이라이팅 없이 디자인으로 가독성 확보) |
| US-04 | 발표자로서 FlowDiagram을 vertical · horizontal 방향으로 사용할 수 있다                           |
| US-05 | 발표자로서 Table로 비교표를 슬라이드에 삽입할 수 있다                                            |
| US-06 | 발표자로서 Highlight · InlineCode를 독립 컴포넌트로 사용할 수 있다                               |

---

## 기술 결정

### ADR-01 ContentBlock 렌더링 구조

**Context**

`ContentTemplate`은 `body: ContentBlock[]`를 받아 각 블록을 렌더링해야 한다. `ContentBlock`은 8가지 kind를 가진 Discriminated Union이다. 렌더링 분기 로직을 어디에 둘지 결정해야 한다.

**Decision**

`ContentBlockRenderer`를 별도 컴포넌트로 분리한다. `ContentTemplate`은 `body`를 map하며 각 블록을 `ContentBlockRenderer`에 위임한다.

```tsx
// ContentTemplate.tsx
{
  body.map((block, i) => (
    <ContentBlockRenderer key={`${block.kind}-${i}`} block={block} />
  ));
}

// ContentBlockRenderer.tsx
switch (block.kind) {
  case "bullets":
    return <BulletList {...block} />;
  case "callout":
    return <Callout {...block} />;
  // ...
}
```

**Alternatives**

- **ContentTemplate 직접 switch**: ContentTemplate에 렌더링 분기를 인라인으로 작성. 파일이 단순하지만 컴포넌트가 비대해지고, 새 kind 추가 시 ContentTemplate을 직접 수정해야 한다.
- **레지스트리 패턴**: `Record<ContentBlock["kind"], ComponentType>`. 유연하지만 TypeScript의 type narrowing을 포기해야 하며 8개 kind 수준에서 과한 추상화다.

**Consequences**

- ✅ `ContentTemplate`은 레이아웃만 담당 — 단일 책임 유지
- ✅ 새 kind 추가 시 `ContentBlockRenderer`의 switch case + 새 컴포넌트 파일 추가로 끝남
- ✅ `ContentBlockRenderer`는 `ProcessTemplate` 외 다른 템플릿에서도 재사용 가능
- ⚠️ block을 spread(`{...block}`)로 전달하면 `kind` 필드가 각 컴포넌트 props로 흘러들어감 → 각 컴포넌트에서 `kind`를 무시하거나 props에서 제외해야 함

---

### ADR-02 FlowDiagram · ProcessTemplate 통합

**Context**

기존 `ProcessTemplate`은 `ProcessArrow` 컴포넌트를 직접 사용해 steps를 vertical로 렌더링한다. 새로 추가하는 `FlowDiagram`은 vertical · horizontal 방향과 wrap을 지원하는 콘텐츠 컴포넌트다. 두 구현이 동일한 step+arrow 로직을 중복한다.

**Decision**

`FlowDiagram`(`entities/slide/ui/content/`)을 구현하고, `ProcessTemplate`이 이를 내부적으로 사용하도록 리팩토링한다. `ProcessArrow`는 `FlowDiagram` 내부로 흡수해 외부 노출을 제거한다.

**Alternatives**

- **별도 유지**: `ProcessTemplate`은 현재 구조 유지, `FlowDiagram`만 신규 추가. step+arrow 로직 중복, `ProcessArrow` 계속 노출.

**Consequences**

- ✅ step+arrow 렌더링 로직 단일화
- ✅ `ProcessArrow` 외부 노출 제거 → FSD public API 축소
- ✅ `FlowDiagram`의 direction · wrap 기능을 `ProcessSlide`에서도 무료로 사용 가능
- ⚠️ 기존 `ProcessTemplate` 변경 → 동작 동일성 검증 필요

---

### ADR-03 Typography 컴포넌트 semantic HTML

**Context**

`Display`, `Heading`, `Subheading`, `Body` 컴포넌트가 렌더링할 HTML 태그를 결정해야 한다. 시맨틱 태그(`h1`, `h2`, `h3`, `p`)를 강제하면 접근성과 SEO에 유리하지만, 발표 환경에서는 HTML 시맨틱보다 시각적 위계가 우선이다.

**Decision**

고정 시맨틱 태그 대신 `as` prop으로 태그를 선택 가능하게 하고, 각 컴포넌트의 기본값을 지정한다.

```tsx
type As = keyof JSX.IntrinsicElements;

interface DisplayProps {
  as?: As;
  children: React.ReactNode;
}
// default as="h1"
```

발표 환경에서는 `section`, `article`, `div` 등 다양한 시맨틱 요소가 필요할 수 있으므로 `keyof JSX.IntrinsicElements`로 열어둔다.

**Alternatives**

- **좁은 유니온 타입** (`"h1" | "h2" | "p" | "span"`): 예상 범위 밖의 태그를 막을 수 있지만, 발표 맥락에서 `section`·`article`·`div` 등이 필요한 케이스를 차단한다.
- **고정 시맨틱 태그**: `Display = h1`, `Heading = h2` 등으로 강제. 단순하지만 한 슬라이드에 h1이 여러 번 등장하는 시나리오를 막지 못하고, 오히려 잘못된 HTML 구조를 강제할 수 있다.

**Consequences**

- ✅ 호출처에서 맥락에 맞는 태그 선택 가능
- ✅ 기본값이 있으므로 대부분 as prop 없이 사용 가능
- ⚠️ `as` prop 남용 시 시맨틱이 무너질 수 있음 — 문서화로 가이드 필요

---

## 컴포넌트 구조

```
entities/slide/
├── model/
│   ├── types.ts          (ContentBlock Union · FlowStep · CompareColumn 추가)
│   └── constants.ts      (bullets → body 마이그레이션)
├── ui/
│   ├── typography/
│   │   ├── Display.tsx       (text-display-1, as prop)
│   │   ├── Heading.tsx       (text-heading-2, as prop)
│   │   ├── Subheading.tsx    (text-heading-4, as prop)
│   │   └── Body.tsx          (text-body-2, as prop)
│   ├── inline/
│   │   ├── Highlight.tsx     (primary 색상 + bold)
│   │   └── InlineCode.tsx    (font-mono + primary-100 배경)
│   ├── content/
│   │   ├── BulletList.tsx    (plain text items)
│   │   ├── OrderedList.tsx   (plain text items)
│   │   ├── Callout.tsx       (info/success/warning, plain text)
│   │   ├── CodeBlock.tsx     (text-code-display 토큰, 디자인 가독성)
│   │   ├── Table.tsx         (headers + rows)
│   │   ├── FlowDiagram.tsx   (direction + flex-wrap)
│   │   ├── ComparePanel.tsx  (좌우 2열)
│   │   └── ImagePanel.tsx    (src + alt + caption)
│   └── ContentBlockRenderer.tsx
└── index.ts
```

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

| 용어                     | 정의                                                                            |
| ------------------------ | ------------------------------------------------------------------------------- |
| **ContentBlock**         | `kind` 필드로 구분되는 Discriminated Union. ContentSlide body의 단위            |
| **ContentBlockRenderer** | `block.kind`로 분기해 적절한 컴포넌트를 선택하는 dispatcher 컴포넌트            |
| **FlowDiagram**          | step + arrow 렌더링 컴포넌트. `direction`(vertical/horizontal) + flex-wrap 지원 |
| **FlowStep**             | FlowDiagram의 단계 단위. `label`(필수) + `description`(선택)                    |
| **Highlight**            | 인라인 강조 텍스트. plain text. Primary 색상 + Bold                             |
| **InlineCode**           | 인라인 코드. plain text. font-mono + primary-100 배경                           |
| **Callout**              | 강조 정보 블록. plain text. info · success · warning 3가지 variant              |
| **as prop**              | Typography 컴포넌트에서 렌더링할 HTML 태그를 지정하는 prop                      |
