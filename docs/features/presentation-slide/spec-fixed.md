# 프레젠테이션 슬라이드 — 확정 스펙

> spec-original.md 기반 인터뷰(Q1~Q5)를 통해 확정된 요구사항.

---

## 확정된 기술 결정 (Q&A 요약)

| #   | 질문                   | 결정                                                                           |
| --- | ---------------------- | ------------------------------------------------------------------------------ |
| Q1  | Slide 타입 구조        | Discriminated Union — 템플릿별 타입 분리                                       |
| Q2  | ContentSlide 본문 타입 | `bullets: string[]` — 데이터 타입으로 관리, ReactNode 미사용                   |
| Q3  | ProcessSlide 화살표    | lucide `ArrowDown` 기반 `<ProcessArrow />` 내부 컴포넌트, description optional |
| Q4  | SplitSlide 열 콘텐츠   | `SplitColumn { heading, bullets }` — ContentSlide와 동일 패턴                  |
| Q5  | SectionSlide 구조      | `sectionNumber` 명시적 관리, `items` optional                                  |

---

## 슬라이드 타입 시스템

### Discriminated Union

```ts
type Slide =
  | CoverSlide
  | SectionSlide
  | ContentSlide
  | ProcessSlide
  | SplitSlide;

type CoverSlide = {
  type: "cover";
  title: string;
  subtitle: string;
  presenter: string;
};

type SectionSlide = {
  type: "section";
  sectionNumber: string; // "01", "02", "03" — 자동 계산 아닌 명시적 관리
  title: string;
  items?: string[]; // 이번 섹션에서 다룰 내용 목록 (optional)
};

type ContentSlide = {
  type: "content";
  chapter: string; // "03. Claude Harness"
  title: string; // 슬라이드 핵심 제목
  bullets: string[]; // 본문 내용
};

type ProcessStep = {
  label: string;
  description?: string; // 각 단계 부연 설명 (optional)
};

type ProcessSlide = {
  type: "process";
  title: string;
  steps: ProcessStep[];
};

type SplitColumn = {
  heading: string;
  bullets: string[];
};

type SplitSlide = {
  type: "split";
  title: string;
  left: SplitColumn;
  right: SplitColumn;
};
```

### 설계 원칙

- 슬라이드 콘텐츠는 **순수 데이터 타입**으로 관리한다 — ReactNode 혼용 금지
- 향후 JSON / MDX / CMS 소스로 교체 가능한 구조를 유지한다
- `SlideView`는 `slide.type`으로 분기해 각 템플릿 컴포넌트를 렌더링한다

---

## 슬라이드 구조 (10장)

| 순서 | 타입           | 핵심 내용                         |
| ---- | -------------- | --------------------------------- |
| 1    | `CoverSlide`   | 발표 제목 · 부제 · 발표자         |
| 2    | `ContentSlide` | 왜 관심을 가지게 되었나           |
| 3    | `ContentSlide` | Harness란 무엇인가                |
| 4    | `SectionSlide` | 내가 구축하고 있는 Claude Harness |
| 5    | `ContentSlide` | CLAUDE.md                         |
| 6    | `ContentSlide` | Design System + Skill             |
| 7    | `ProcessSlide` | Feature Planning Workflow         |
| 8    | `SectionSlide` | 다음 실험 계획                    |
| 9    | `SplitSlide`   | 현재까지 / 앞으로                 |
| 10   | `ContentSlide` | 마무리                            |

---

## 화살표 컴포넌트 (`ProcessArrow`)

- `lucide-react`의 `ArrowDown` 기반
- `widgets/slide-deck/ui/` 내부 전용 컴포넌트 — barrel export 하지 않음
- step 박스는 내용에 따라 높이가 자연스럽게 확장되고, 화살표는 고정 크기로 step 사이에 위치

---

## 네비게이션 (spec-original.md에서 그대로 유지)

- `ArrowRight` → 다음 슬라이드
- `ArrowLeft` → 이전 슬라이드
- 첫/마지막 슬라이드 경계에서 무동작
- 마우스 클릭 버튼 네비게이션
- `현재 / 전체` 인디케이터
- 슬라이드 전환 애니메이션 (CSS translateX)
- `prefers-reduced-motion` 대응

---

## Out of Scope

- CodeBlock 콘텐츠 타입 — ContentSlide의 body 확장은 다음 이터레이션
- FlowDiagram 컴포넌트 — 별도 문서에서 정의 예정
- Speaker Note / 발표자 모드
- PDF Export
- 모바일 최적화
- 콘텐츠 편집 기능
- 서버 연동 / CMS 실제 연결 (구조만 대응)
- Storybook 문서화

---

## 용어 정의

| 용어              | 정의                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| **Slide**         | 한 장의 발표 화면. `type` 필드로 템플릿을 구분한다                     |
| **SlideTemplate** | 슬라이드의 레이아웃 구조 (Cover · Section · Content · Process · Split) |
| **SlideDeck**     | 슬라이드 전체를 관리하는 위젯 컴포넌트 (`widgets/slide-deck`)          |
| **chapter**       | ContentSlide 상단에 표시되는 대주제 레이블 (예: "03. Claude Harness")  |
| **sectionNumber** | SectionSlide에서 명시적으로 관리하는 섹션 번호 문자열 (예: "03")       |
| **ProcessStep**   | ProcessSlide의 단계 단위. label(필수) + description(선택)              |
| **SplitColumn**   | SplitSlide의 열 단위. heading + bullets로 구성                         |
