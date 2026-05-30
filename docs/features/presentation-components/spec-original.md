# 프레젠테이션 컴포넌트 시스템 기능 정의서

## 기능 개요

프레젠테이션 슬라이드 내부에서 재사용 가능한 콘텐츠 컴포넌트 시스템을 제공한다.

슬라이드는 레이아웃만 담당하며, 실제 콘텐츠는 Presentation Component를 조합하여 구성한다.

이를 통해 다양한 발표 자료를 일관된 디자인과 UX로 작성할 수 있어야 한다.

---

## 목적

- 슬라이드와 콘텐츠를 분리한다.
- 발표 자료의 디자인 일관성을 유지한다.
- 반복되는 UI 구현을 제거한다.
- Storybook 기반 문서화가 가능해야 한다.
- 향후 MDX 또는 CMS 데이터와 연결 가능해야 한다.

---

## 기능 요구사항

- 모든 컴포넌트는 디자인 시스템 토큰을 사용한다.
- 모든 컴포넌트는 다크 모드를 지원한다.
- 컴포넌트는 독립적으로 렌더링 가능해야 한다.
- 컴포넌트는 ContentSlide, SectionSlide 등 어떤 슬라이드에서도 사용할 수 있어야 한다.
- 발표 환경에서 가독성을 최우선으로 한다.

---

# 컴포넌트 목록

## Typography

### Display

발표 표지용 대형 타이포그래피

예시

```text
Claude Harness
```

---

### Heading

슬라이드 제목

예시

```text
Feature Planning Workflow
```

---

### Subheading

소제목

예시

```text
Design System + Skill
```

---

### Body

본문 텍스트

---

## Inline Components

### Highlight

강조 텍스트

예시

```text
Claude Harness
```

특징

- Primary 색상 사용
- Bold 적용

---

### InlineCode

인라인 코드

예시

```text
CLAUDE.md
```

특징

- Primary 계열 배경 사용
- Monospace 폰트 사용
- 노션 Ctrl+E 스타일

---

## Content Components

### BulletList

순서 없는 목록

예시

```text
• 반복 지시 제거
• 일관성 확보
• 생산성 향상
```

---

### OrderedList

순서 있는 목록

예시

```text
1. Spec 작성
2. ADR 작성
3. 구현
```

---

### Callout

강조 정보 표시

종류

- Info
- Success
- Warning

---

### CodeBlock

코드 표시

지원 언어

- text
- md
- js
- ts

---

### Table

비교표

예시

```text
기준 | 안 A | 안 B | 안 C
```

---

### FlowDiagram

워크플로우 표현

예시

```text
spec-original
 ↓
spec-fixed
 ↓
PRD
```

---

### ComparePanel

좌우 비교

예시

```text
현재
|
미래
```

---

### ImagePanel

이미지 및 스크린샷 표시

예시

```text
Architecture Diagram
```

---

## 디자인 원칙

### Color

Primary Scale

- primary-50
- primary-100
- primary-200
- primary-300
- primary-400
- primary-500
- primary-600
- primary-700
- primary-800
- primary-900

Accent Scale

- orange
- green
- violet

---

### Typography

기본 폰트

```text
Pretendard
```

코드 폰트

```text
JetBrains Mono
```

---

### Radius

기본 Radius

```text
12px
```

강조 카드

```text
16px
```

---

### Spacing

기본 단위

```text
4px
```

사용 권장

```text
8
12
16
24
32
48
```

---

## Out of Scope

- 슬라이드 네비게이션
- 슬라이드 애니메이션
- PDF Export
- 발표자 모드
- Speaker Note
- 콘텐츠 편집기
- CMS 연동
- MDX 렌더러

---

## 비고

이번 버전은 Presentation Component System 구축이 목적이다.

실제 Storybook 문서화와 디자인 토큰 검증은 이후 단계에서 진행한다.
