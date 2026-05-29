# 프레젠테이션 페이지 이슈 목록

> 참조 PRD: `docs/features/presentation/prd.md`
> 수직 슬라이스 원칙: 이슈 하나만 완료해도 사용자에게 보여줄 수 있는 동작이 있어야 한다.

---

## Issue 1 — 슬라이드 덱 기본 렌더링 구현

**목적:** `/harness`의 placeholder 페이지를 실제 슬라이드 덱으로 교체한다.  
**완료 시 동작:** `/harness` 진입 시 첫 번째 슬라이드가 16:9 비율로 화면 중앙에 표시된다.  
**의존성:** 없음

### 구현 범위

- `entities/slide/model/types.ts` — `Slide` 인터페이스 정의
- `entities/slide/model/constants.ts` — `SLIDES` 배열 (placeholder 7장, 제목 + bullets)
- `entities/slide/index.ts` — barrel export
- `widgets/slide-deck/ui/SlideView.tsx` — 단일 슬라이드 표시 컴포넌트 (title + bullets)
- `widgets/slide-deck/ui/SlideDeck.tsx` — `slides: Slide[]` prop 수신, 첫 슬라이드 표시
- `widgets/slide-deck/index.ts` — barrel export
- `pages/harness/ui/HarnessPage.tsx` — placeholder 제거, `<SlideDeck slides={SLIDES} />` 연결

### Acceptance Criteria

```
- [ ] Given /harness 페이지에 진입했을 때,
      When 페이지가 로드되면,
      Then 첫 번째 슬라이드(1번)의 title과 bullets가 화면에 표시된다.

- [ ] Given SlideDeck이 렌더링될 때,
      When 슬라이드 박스의 크기를 확인하면,
      Then 가로:세로 비율이 16:9(aspect-video)로 유지된다.

- [ ] Given SlideDeck이 렌더링될 때,
      When 화면 크기가 변경되어도,
      Then 슬라이드 박스는 화면 중앙에 위치하고 16:9 비율을 유지한다.

- [ ] Given SLIDES 배열에 7개 슬라이드가 정의되었을 때,
      When SlideDeck에 slides prop으로 주입하면,
      Then 첫 번째 슬라이드(index 0)의 내용이 렌더링된다.
```

---

## Issue 2 — 슬라이드 네비게이션 구현 (키보드 + 마우스 + 인디케이터)

**목적:** 키보드 방향키와 화살표 버튼으로 슬라이드를 이동하고, 진행 상황을 인디케이터로 표시한다.  
**완료 시 동작:** 키보드와 마우스로 슬라이드를 앞뒤로 이동하고, 하단 인디케이터가 `현재 / 7` 형식으로 업데이트된다.  
**의존성:** Issue 1

### 구현 범위

- `widgets/slide-deck/model/useSlideNavigation.ts` — `currentIndex`, `goNext`, `goPrev`, `canGoNext`, `canGoPrev`, `document keydown` 이벤트 처리
- `widgets/slide-deck/ui/SlideControls.tsx` — 이전/다음 오버레이 화살표 버튼, 경계 비활성화 처리
- `widgets/slide-deck/ui/SlideIndicator.tsx` — `현재 / 전체` 하단 인디케이터
- `widgets/slide-deck/ui/SlideDeck.tsx` — `useSlideNavigation` 연결, `SlideControls` + `SlideIndicator` 조합

### Acceptance Criteria

```
- [ ] Given 현재 슬라이드가 첫 번째가 아닐 때,
      When ArrowRight를 누르면,
      Then 다음 슬라이드로 이동하고 인디케이터가 업데이트된다.

- [ ] Given 현재 슬라이드가 마지막이 아닐 때,
      When ArrowLeft를 누르면,
      Then 이전 슬라이드로 이동하고 인디케이터가 업데이트된다.

- [ ] Given 현재 슬라이드가 첫 번째(1번)일 때,
      When ArrowLeft를 누르거나 이전 버튼을 클릭하면,
      Then 슬라이드가 변경되지 않는다.

- [ ] Given 현재 슬라이드가 마지막(7번)일 때,
      When ArrowRight를 누르거나 다음 버튼을 클릭하면,
      Then 슬라이드가 변경되지 않는다.

- [ ] Given 첫 번째 슬라이드가 표시될 때,
      When 이전 버튼을 확인하면,
      Then 이전 버튼이 비활성화(disabled) 상태로 표시된다.

- [ ] Given 마지막 슬라이드가 표시될 때,
      When 다음 버튼을 확인하면,
      Then 다음 버튼이 비활성화(disabled) 상태로 표시된다.

- [ ] Given 슬라이드가 3번째로 이동했을 때,
      When 인디케이터를 확인하면,
      Then `3 / 7` 형식으로 표시된다.

- [ ] Given 다음 버튼에 마우스를 올렸을 때,
      When hover 상태를 확인하면,
      Then 버튼이 시각적으로 강조된다.
```

---

## Issue 3 — 슬라이드 전환 애니메이션 구현

**목적:** 슬라이드 이동 시 방향에 맞는 좌우 슬라이드 애니메이션을 적용한다.  
**완료 시 동작:** 다음으로 이동 시 오른쪽에서 진입, 이전으로 이동 시 왼쪽에서 진입하는 CSS 전환이 동작한다. `prefers-reduced-motion` 환경에서는 즉시 교체된다.  
**의존성:** Issue 2

### 구현 범위

- `widgets/slide-deck/model/useSlideNavigation.ts` — `direction: 'next' | 'prev' | null` state 추가
- `widgets/slide-deck/ui/SlideView.tsx` — CSS `translateX` 기반 진입/퇴장 전환, `overflow: hidden` 처리
- `src/app/styles/index.css` — `prefers-reduced-motion` 전환 비활성화 CSS 추가 (또는 Tailwind arbitrary)

### Acceptance Criteria

```
- [ ] Given 다음 슬라이드로 이동할 때,
      When 전환이 시작되면,
      Then 현재 슬라이드는 왼쪽으로 밀려나고 새 슬라이드는 오른쪽에서 진입하는 애니메이션이 동작한다.

- [ ] Given 이전 슬라이드로 이동할 때,
      When 전환이 시작되면,
      Then 현재 슬라이드는 오른쪽으로 밀려나고 새 슬라이드는 왼쪽에서 진입하는 애니메이션이 동작한다.

- [ ] Given prefers-reduced-motion이 활성화된 환경일 때,
      When 슬라이드를 이동하면,
      Then 애니메이션 없이 슬라이드가 즉시 교체된다.

- [ ] Given /harness 페이지에 최초 진입할 때,
      When 첫 슬라이드가 로드되면,
      Then 진입 애니메이션이 발생하지 않는다. (초기 방향 state가 null)
```

---

## GitHub 이슈 등록 명령어

> gh CLI 설치 후 아래 명령어를 순서대로 실행한다.

```bash
# Issue 1
gh issue create \
  --title "[presentation] 슬라이드 덱 기본 렌더링 구현" \
  --body "## 목적
\`/harness\`의 placeholder 페이지를 실제 슬라이드 덱으로 교체한다.

## 완료 시 동작
\`/harness\` 진입 시 첫 번째 슬라이드가 16:9 비율로 화면 중앙에 표시된다.

## 구현 범위
- \`entities/slide\` 슬라이스 신설 (Slide 타입 + SLIDES 상수)
- \`widgets/slide-deck\` 신설 (SlideDeck + SlideView)
- \`pages/harness\` placeholder 교체

## Acceptance Criteria
- [ ] Given /harness 진입 시, When 로드되면, Then 첫 슬라이드 title·bullets 표시
- [ ] Given SlideDeck 렌더링 시, When 크기 확인 시, Then 16:9(aspect-video) 비율 유지
- [ ] Given 뷰포트 변경 시, When 크기 조정되면, Then 슬라이드 박스가 중앙 유지·16:9 유지
- [ ] Given slides 배열 7개 주입 시, When 렌더링되면, Then index 0 슬라이드가 표시됨" \
  --label "feature"

# Issue 2
gh issue create \
  --title "[presentation] 슬라이드 네비게이션 구현 (키보드 + 마우스 + 인디케이터)" \
  --body "## 목적
키보드 방향키와 화살표 버튼으로 슬라이드를 이동하고 인디케이터를 표시한다.

## 완료 시 동작
키보드·마우스로 슬라이드 이동, 하단 인디케이터가 '현재 / 7' 형식으로 업데이트된다.

## 의존성
Issue 1 완료 후 진행

## 구현 범위
- \`useSlideNavigation\` 훅 (currentIndex, goNext/goPrev, keydown 이벤트)
- \`SlideControls\` (오버레이 화살표, 경계 비활성화)
- \`SlideIndicator\` (현재 / 전체)

## Acceptance Criteria
- [ ] Given 첫 번째가 아닐 때, When ArrowRight 입력, Then 다음 슬라이드 이동·인디케이터 업데이트
- [ ] Given 마지막이 아닐 때, When ArrowLeft 입력, Then 이전 슬라이드 이동·인디케이터 업데이트
- [ ] Given 첫 번째일 때, When ArrowLeft 또는 이전 버튼, Then 슬라이드 변경 없음
- [ ] Given 마지막(7번)일 때, When ArrowRight 또는 다음 버튼, Then 슬라이드 변경 없음
- [ ] Given 첫 번째 슬라이드 시, When 이전 버튼 확인, Then disabled 상태 표시
- [ ] Given 마지막 슬라이드 시, When 다음 버튼 확인, Then disabled 상태 표시
- [ ] Given 3번째 슬라이드 시, When 인디케이터 확인, Then '3 / 7' 표시
- [ ] Given 다음 버튼 hover 시, When hover 상태 확인, Then 시각적 강조" \
  --label "feature"

# Issue 3
gh issue create \
  --title "[presentation] 슬라이드 전환 애니메이션 구현" \
  --body "## 목적
슬라이드 이동 시 방향에 맞는 좌우 CSS 슬라이드 전환 애니메이션을 적용한다.

## 완료 시 동작
다음→오른쪽 진입, 이전→왼쪽 진입 애니메이션. prefers-reduced-motion 시 즉시 교체.

## 의존성
Issue 2 완료 후 진행

## 구현 범위
- \`useSlideNavigation\`에 direction state 추가
- \`SlideView\`에 CSS translateX 전환 적용
- prefers-reduced-motion CSS 처리

## Acceptance Criteria
- [ ] Given 다음 이동 시, When 전환 시작, Then 현재↙왼쪽·새 슬라이드↗오른쪽에서 진입
- [ ] Given 이전 이동 시, When 전환 시작, Then 현재↘오른쪽·새 슬라이드↗왼쪽에서 진입
- [ ] Given prefers-reduced-motion 활성 시, When 슬라이드 이동, Then 즉시 교체
- [ ] Given 최초 진입 시, When 첫 슬라이드 로드, Then 진입 애니메이션 없음" \
  --label "feature"
```
