# 이슈 분해 — 프레젠테이션 슬라이드 템플릿 시스템

> 수직 슬라이스 원칙 적용: 각 이슈 완료 시 사용자에게 보여줄 수 있는 동작이 있어야 한다.

---

## 의존성 순서

```
Issue 1 (타입 시스템 + ContentTemplate)
  → Issue 2 (CoverTemplate + SectionTemplate)
    → Issue 3 (ProcessTemplate + SplitTemplate)
```

---

## Issue 1 — 타입 시스템 + SlideRenderer + ContentTemplate

**완료 시 보여줄 동작**: `/harness` 진입 시 ContentSlide 5장(2·3·5·6·10번)이 `chapter / title / bullets` 레이아웃으로 실제 발표 내용을 표시한다.

### 작업 범위

| 파일                                                  | 작업                                                                                                             |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `entities/slide/model/types.ts`                       | `Slide` Discriminated Union 전면 교체 (5가지 타입 정의)                                                          |
| `entities/slide/model/constants.ts`                   | 10장 실제 데이터로 교체. ContentSlide(2·3·5·6·10)는 실제 내용, 나머지(1·4·7·8·9)는 임시 ContentSlide placeholder |
| `widgets/slide-deck/ui/SlideRenderer.tsx`             | 신규 — `slide.type`으로 분기, `"content"` case + 기본 fallback                                                   |
| `widgets/slide-deck/ui/templates/ContentTemplate.tsx` | 신규 — chapter · title · bullets 레이아웃                                                                        |
| `widgets/slide-deck/ui/SlideView.tsx`                 | `displaySlide` 렌더링을 `<SlideRenderer slide={displaySlide} />`로 교체                                          |

### Acceptance Criteria

- [ ] Given `/harness`에 진입했을 때, When 페이지가 로드되면, Then SlideDeck이 정상 렌더링된다
- [ ] Given `slide.type === "content"`인 슬라이드가 표시될 때, When SlideRenderer가 처리하면, Then ContentTemplate이 chapter · title · bullets를 각자 영역에 렌더링한다
- [ ] Given `slide.type`이 `"content"`가 아닌 슬라이드가 표시될 때, When SlideRenderer가 처리하면, Then TypeScript 에러 없이 fallback이 렌더링된다
- [ ] Given 기존 네비게이션 동작(키보드·버튼·인디케이터·애니메이션)이 있을 때, When Issue 1 변경을 적용하면, Then 기존 동작이 모두 그대로 유지된다

---

## Issue 2 — CoverTemplate + SectionTemplate

**완료 시 보여줄 동작**: 슬라이드 1번이 제목·부제·발표자를 담은 Cover 레이아웃으로, 4·8번이 섹션 번호와 전환 타이틀을 담은 Section 레이아웃으로 표시된다.

**의존성**: Issue 1 완료 후 진행

### 작업 범위

| 파일                                                  | 작업                                                           |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| `widgets/slide-deck/ui/templates/CoverTemplate.tsx`   | 신규 — title · subtitle · presenter 중앙 정렬 레이아웃         |
| `widgets/slide-deck/ui/templates/SectionTemplate.tsx` | 신규 — sectionNumber · title · items(optional) 레이아웃        |
| `widgets/slide-deck/ui/SlideRenderer.tsx`             | `"cover"` · `"section"` case 추가                              |
| `entities/slide/model/constants.ts`                   | 슬라이드 1 → CoverSlide, 4·8 → SectionSlide 실제 데이터로 교체 |

### Acceptance Criteria

- [ ] Given `slide.type === "cover"`인 슬라이드가 표시될 때, When CoverTemplate이 렌더링되면, Then title · subtitle · presenter가 화면 중앙에 표시된다
- [ ] Given `slide.type === "section"`이고 `items`가 있을 때, When SectionTemplate이 렌더링되면, Then sectionNumber · title · items가 모두 표시된다
- [ ] Given `slide.type === "section"`이고 `items`가 없을 때, When SectionTemplate이 렌더링되면, Then sectionNumber · title만 표시되고 에러가 없다
- [ ] Given Issue 1 이후 10장 전체 탐색이 가능할 때, When Issue 2 변경을 적용하면, Then 1·4·8번 슬라이드의 레이아웃이 Cover/Section 템플릿으로 교체되고 나머지 슬라이드는 영향받지 않는다

---

## Issue 3 — ProcessTemplate + SplitTemplate

**완료 시 보여줄 동작**: 슬라이드 7번이 단계별 플로우 다이어그램으로, 9번이 좌우 비교 레이아웃으로 표시된다. 전체 10장 발표가 완성된다.

**의존성**: Issue 2 완료 후 진행

### 작업 범위

| 파일                                                  | 작업                                                                   |
| ----------------------------------------------------- | ---------------------------------------------------------------------- |
| `widgets/slide-deck/ui/ProcessArrow.tsx`              | 신규 — lucide `ArrowDown` 기반 내부 전용 컴포넌트 (barrel export 없음) |
| `widgets/slide-deck/ui/templates/ProcessTemplate.tsx` | 신규 — steps · description(optional) · ProcessArrow 레이아웃           |
| `widgets/slide-deck/ui/templates/SplitTemplate.tsx`   | 신규 — 좌우 2열 SplitColumn 레이아웃                                   |
| `widgets/slide-deck/ui/SlideRenderer.tsx`             | `"process"` · `"split"` case 추가                                      |
| `entities/slide/model/constants.ts`                   | 슬라이드 7 → ProcessSlide, 9 → SplitSlide 실제 데이터로 교체           |

### Acceptance Criteria

- [ ] Given `slide.type === "process"`인 슬라이드가 표시될 때, When ProcessTemplate이 렌더링되면, Then steps가 `ProcessArrow`를 사이에 두고 순서대로 표시된다
- [ ] Given `ProcessStep`에 `description`이 있을 때, When 렌더링되면, Then label과 description이 함께 표시된다
- [ ] Given `ProcessStep`에 `description`이 없을 때, When 렌더링되면, Then label만 표시되고 에러가 없다
- [ ] Given `slide.type === "split"`인 슬라이드가 표시될 때, When SplitTemplate이 렌더링되면, Then left · right 두 열이 나란히 표시되고 각 열에 heading · bullets가 렌더링된다
- [ ] Given 전체 10장 슬라이드가 있을 때, When Issue 3 완료 후 처음부터 끝까지 탐색하면, Then 모든 슬라이드가 의도한 템플릿 레이아웃으로 표시된다
