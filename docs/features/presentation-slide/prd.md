# PRD — 프레젠테이션 슬라이드 템플릿 시스템

---

## 개요

### 목적

5가지 슬라이드 템플릿(Cover · Section · Content · Process · Split)을 갖춘 발표 레이아웃 시스템을 구축한다. 콘텐츠와 레이아웃을 분리해 이후 다른 발표에도 동일한 구조를 재사용할 수 있도록 한다.

### 배경

기존 `widgets/slide-deck/`은 `{ title, bullets }` 단일 구조만 렌더링하는 placeholder 수준이다. "Claude Harness를 활용한 AI 개발 워크플로우 구축" 발표(10장)를 실제로 전달하려면 템플릿별 레이아웃 시스템이 필요하다.

### 성공 기준

- 5가지 템플릿이 각각 고유한 레이아웃으로 렌더링된다
- 발표 10장을 오류 없이 순서대로 탐색할 수 있다
- 새 발표를 추가할 때 콘텐츠 데이터(`SLIDES` 배열)만 교체하면 된다
- 기존 네비게이션·애니메이션·인디케이터 동작이 그대로 유지된다

---

## 사용자 스토리

| ID    | 스토리                                                                   |
| ----- | ------------------------------------------------------------------------ |
| US-01 | 발표자로서 `/harness` 진입 시 CoverSlide(첫 슬라이드)를 볼 수 있다       |
| US-02 | 키보드 방향키와 클릭 버튼으로 슬라이드를 이동할 수 있다                  |
| US-03 | `현재 / 전체` 인디케이터로 발표 진행 위치를 파악할 수 있다               |
| US-04 | 슬라이드 전환 시 이동 방향에 맞는 애니메이션이 적용된다                  |
| US-05 | 각 템플릿이 고유한 레이아웃으로 렌더링된다 (Cover ≠ Section ≠ Content …) |

---

## 기술 결정

### ADR-01 슬라이드 템플릿 통합 구조

**Context**

`SlideView`는 현재 CSS translateX 기반 슬라이드 전환 애니메이션과 단일 템플릿 렌더링을 함께 담당한다. 5가지 템플릿을 지원하려면 `SlideView` 내부에서 템플릿 분기 로직이 추가되어야 한다. 책임 범위가 넓어지면 애니메이션 수정과 템플릿 추가가 같은 파일에서 발생해 변경 충돌 위험이 생긴다.

**Decision**

`SlideView`는 애니메이션 래퍼 역할만 유지하고, `SlideRenderer`를 신규 추가해 `slide.type`에 따른 템플릿 컴포넌트 선택을 담당하게 한다.

```
SlideView (애니메이션 래퍼)
  └── SlideRenderer (type → template dispatch)
        ├── CoverTemplate
        ├── SectionTemplate
        ├── ContentTemplate
        ├── ProcessTemplate
        └── SplitTemplate
```

**Alternatives**

- **안 A — SlideView 직접 분기**: 거부. SlideView에 애니메이션 + type switch가 혼재하면 단일 책임 원칙 위반. 템플릿이 추가될 때마다 애니메이션 로직과 같은 파일을 수정해야 한다.
- **안 C — 레지스트리 패턴**: 거부. 템플릿이 5개인 현재 수준에서는 과한 추상화다. 런타임 조회 방식은 TypeScript의 type narrowing 이점도 잃는다. 템플릿이 대폭 늘어나거나 외부 플러그인처럼 동적 등록이 필요해지면 그때 마이그레이션한다.

**Consequences**

- ✅ `SlideView`는 애니메이션만 담당 — 기존 코드 최소 수정
- ✅ 템플릿 추가 시 `SlideRenderer` switch 한 줄 + 새 파일 하나로 끝남
- ✅ 각 템플릿 컴포넌트를 독립적으로 개발·테스트 가능
- ⚠️ `SlideRenderer`라는 중간 레이어가 생겨 파일 수 증가 (5 → 8)
- ⚠️ 추후 레지스트리 패턴으로 전환 시 `SlideRenderer` 재작성 필요

---

### ADR-02 슬라이드 콘텐츠 타입 구조

**Context**

슬라이드 콘텐츠를 데이터로 관리하되(ReactNode 미사용), 5가지 템플릿이 서로 다른 데이터 형태를 가진다. 하나의 타입으로 모든 케이스를 optional 필드로 수용하면 각 템플릿에서 어떤 필드가 필수인지 타입으로 강제되지 않는다.

**Decision**

Discriminated Union으로 템플릿별 타입을 분리한다. `type` 필드가 리터럴 타입으로 각 케이스를 구분하며, TypeScript의 type narrowing이 switch문에서 자동으로 작동한다.

**Alternatives**

- **optional 필드 확장**: 거부. `cover` 슬라이드에서 `bullets`가 undefined인지 확인해야 하는 등 모든 소비 지점에서 방어 코드가 생긴다.
- **ReactNode body**: 거부. 콘텐츠가 React에 종속되어 JSON·MDX·CMS 소스로의 교체가 불가능해진다.

**Consequences**

- ✅ 각 템플릿에 필요한 필드만 명시적으로 정의 — 잘못된 데이터는 컴파일 에러
- ✅ `switch (slide.type)` 분기에서 TypeScript가 각 case의 타입을 자동 추론
- ✅ 데이터·레이아웃 분리 — 향후 JSON·MDX·CMS 소스 교체 가능
- ⚠️ 새 템플릿 추가 시 Union 타입 확장 + SlideRenderer case 추가 + 템플릿 컴포넌트 신규 작성의 세 단계가 필요

---

## 컴포넌트 구조 (변경 후)

```
widgets/slide-deck/
├── model/
│   └── useSlideNavigation.ts     (변경 없음)
├── ui/
│   ├── SlideDeck.tsx             (변경 없음)
│   ├── SlideView.tsx             (최소 수정 — SlideRenderer 호출 추가)
│   ├── SlideRenderer.tsx         (신규 — type dispatch)
│   ├── templates/
│   │   ├── CoverTemplate.tsx     (신규)
│   │   ├── SectionTemplate.tsx   (신규)
│   │   ├── ContentTemplate.tsx   (신규)
│   │   ├── ProcessTemplate.tsx   (신규)
│   │   └── SplitTemplate.tsx     (신규)
│   ├── ProcessArrow.tsx          (신규 — lucide ArrowDown 래퍼, 내부 전용)
│   ├── SlideControls.tsx         (변경 없음)
│   └── SlideIndicator.tsx        (변경 없음)
└── index.ts                      (변경 없음)

entities/slide/
├── model/
│   ├── types.ts                  (전면 교체 — Discriminated Union)
│   └── constants.ts              (전면 교체 — 10장 실제 데이터)
└── index.ts                      (변경 없음)
```

---

## Out of Scope

- `CodeBlock` 콘텐츠 타입 — ContentSlide body 확장은 다음 이터레이션
- `FlowDiagram` 컴포넌트 — 별도 문서에서 정의 예정
- Speaker Note / 발표자 모드
- PDF Export
- 모바일 최적화
- 콘텐츠 편집 기능
- 서버 연동 / CMS 실제 연결 (데이터 구조만 대응)
- Storybook 문서화
- 레지스트리 패턴 전환 (템플릿 수 증가 시 재검토)

---

## 용어 정의

| 용어              | 정의                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| **Slide**         | 한 장의 발표 화면. `type` 필드로 템플릿을 구분한다                     |
| **SlideTemplate** | 슬라이드의 레이아웃 구조 (Cover · Section · Content · Process · Split) |
| **SlideDeck**     | 슬라이드 전체를 관리하는 위젯 컴포넌트                                 |
| **SlideView**     | 슬라이드 전환 애니메이션을 담당하는 래퍼 컴포넌트                      |
| **SlideRenderer** | `slide.type`으로 분기해 템플릿 컴포넌트를 선택하는 컴포넌트            |
| **chapter**       | ContentSlide 상단 대주제 레이블 (예: "03. Claude Harness")             |
| **sectionNumber** | SectionSlide의 명시적 섹션 번호 문자열 (예: "03")                      |
| **ProcessStep**   | ProcessSlide의 단계 단위. `label`(필수) + `description`(선택)          |
| **SplitColumn**   | SplitSlide의 열 단위. `heading` + `bullets`로 구성                     |
