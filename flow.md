# 작업 흐름 기록 (Flow)

> Claude Code Harness와 진행한 전체 대화 및 의사결정 흐름을 정리한 문서.
> 각 단계에서 참조한 문서와 생성된 산출물을 함께 기록한다.

---

## 0. 초기 커밋

**한 일:** 프로젝트 초기 셋업 전체를 하나의 커밋으로 정리

**포함 내용:**

- Vite + React 19 + TypeScript SPA 기반 구조
- FSD 4-layer 아키텍처 (`shared → entities → features → widgets → pages`)
- `.claude/rules/` 14개 룰 파일 (FSD, API, 상태 관리, 컴포넌트, className 등)
- `.claude/hooks/fsd-layer-check.sh` — Edit/Write 시 import 방향 자동 차단
- `.claude/skills/` — design-check, design-system 스킬
- `docs/design-system/` — 컬러 토큰, 타이포그래피, 스페이싱, elevation 문서
- `scripts/check-design-system.js` — PostToolUse 디자인 시스템 위반 자동 감지
- Husky + commitlint 커밋 컨벤션 가드

**커밋:** `chore: 프로젝트 초기 셋업 및 Claude AI 개발 환경 구성`

---

## 1. 홈 페이지

### 1-1. 스펙 인터뷰 (Q&A)

**참조 문서:** `docs/features/home/spec-original.md`

**진행 방식:** 기본 기능 정의서를 읽고, 데이터 구조·UI 패턴·엣지 케이스 기준으로 1문1답 방식으로 진행

| #   | 질문                        | 결정                                           |
| --- | --------------------------- | ---------------------------------------------- |
| Q1  | 사이트 이름과 소개 문구는?  | "Presentation Archive" — 개인 발표 자료 보관소 |
| Q2  | 키워드 표시 형태는?         | A안 — 배지(Badge) 형태                         |
| Q3  | 카드 클릭 시 이동 방식은?   | B안 — 새 탭 (`target="_blank"`)                |
| Q4  | 페이지 전체 레이아웃은?     | B안 — 전체 수직 중앙 정렬                      |
| Q5  | 다크모드 토글 포함 여부?    | 토글 포함 + 우상단, 기본값 dark                |
| Q6  | `/harness` 라우트가 없는데? | B안 — placeholder 페이지 생성                  |

**생성 문서:** `docs/features/home/spec-fixed.md`

---

### 1-2. PRD 작성

**참조 문서:** `docs/features/home/spec-fixed.md`

**구조:**

- 개요 (목적, 배경, 범위, 성공 기준)
- 사용자 스토리 4개 (US-01~04)
- 기술 결정 — ADR 4개 (다음 세션 논의 예정으로 비워둠)
- Out of Scope (인증/서버/콘텐츠/네비게이션/성능/접근성)
- 용어 정의

**생성 문서:** `docs/features/home/prd.md`

---

### 1-3. 아키텍처 3안 제안 및 비교

**참조 문서:** `docs/features/home/spec-fixed.md`

| 기준                | 안 A (자기 완결) | 안 B (FSD 정통) | 안 C (Headless 훅) |
| ------------------- | :--------------: | :-------------: | :----------------: |
| 데이터 구조 명확성  |        △         |       ✅        |         ✅         |
| API 전환 용이성     |        ❌        |       ✅        |        ✅✅        |
| 상태 관리 변경 범위 |        ❌        |       ✅        |        ✅✅        |
| FSD 패턴 일관성     |        △         |      ✅✅       |         △          |
| 테스트 용이성       |        ✅        |       ✅        |        ✅✅        |

**선택:** **안 B + 안 C 혼합** — `entities/presentation` FSD 분리 + `usePresentations()` 훅 추상화

**선택 이유 요약:**

1. FSD 아키텍처 일관성 유지
2. React Composition 패턴 선호 (컴포넌트는 표현, 로직은 훅)
3. API 전환 시 훅 내부만 교체
4. 훅 Mocking으로 테스트 용이

---

### 1-4. ADR 작성

**참조 문서:** `docs/features/home/prd.md` (기술 결정 섹션)

| ADR                          | 결정                                           | 핵심 트레이드오프                     |
| ---------------------------- | ---------------------------------------------- | ------------------------------------- |
| ADR-01 발표 카드 데이터 관리 | `entities/presentation` + `usePresentations()` | ceremony 과다 vs API 전환 비용 최소화 |
| ADR-02 다크모드 기본값       | localStorage 없을 때 항상 `"dark"`             | 발표 환경 최적화 vs 시스템 설정 무시  |
| ADR-03 새 탭 라우팅          | `<a target="_blank" rel="noreferrer">`         | 단순 구현 vs rel 누락 시 보안 취약점  |
| ADR-04 placeholder 페이지    | `pages/harness` 슬라이스 신설                  | 안전한 fallback vs 빈 페이지 배포     |

**업데이트 문서:** `docs/features/home/prd.md`

---

### 1-5. 구현

**참조 문서:** `docs/features/home/spec-fixed.md`, `docs/features/home/prd.md`

**생성/수정 파일:**

| 파일                                              | 내용                             |
| ------------------------------------------------- | -------------------------------- |
| `entities/presentation/model/types.ts`            | `Presentation` 인터페이스        |
| `entities/presentation/model/constants.ts`        | `PRESENTATION_CARDS` 배열        |
| `entities/presentation/model/usePresentations.ts` | 데이터 접근 추상화 훅            |
| `entities/presentation/ui/PresentationCard.tsx`   | 배지·외부링크 카드 컴포넌트      |
| `entities/presentation/index.ts`                  | barrel export                    |
| `pages/home/ui/HomePage.tsx`                      | 수직 중앙 레이아웃 + ThemeToggle |
| `pages/home/model/constants.ts`                   | `SITE_TITLE`, `SITE_DESCRIPTION` |
| `pages/harness/ui/HarnessPage.tsx`                | placeholder 페이지               |
| `pages/harness/index.ts`                          | barrel export                    |
| `shared/lib/theme.ts`                             | 다크 기본값으로 변경             |
| `app/index.tsx`                                   | `/harness` 라우트 추가           |

**발견 및 수정한 버그:**

- `header`가 `absolute`인데 `main`이 `min-h-screen`으로 덮어 ThemeToggle 클릭이 막힘 → `z-10` 추가로 해결

**Playwright 검증 결과 (전체 PASS):**

- 다크 기본값: system=light 환경에서도 `class: dark` 적용 확인
- 카드 href, rel, target 값 확인
- ThemeToggle 우상단 16px 위치 확인
- 토글 클릭 시 라이트 전환 확인
- `/harness` placeholder 텍스트 및 홈 링크 확인

**커밋:** `feat: 홈 페이지 구현 (FSD Entity + Custom Hook 혼합 구조)`

---

## 2. 프레젠테이션 페이지

### 2-1. 스펙 인터뷰 (Q&A)

**참조 문서:** `docs/features/presentation/spec-original.md`

**진행 방식:** 동일하게 1문1답, 남은 질문 수 안내 포함

| #   | 질문                        | 결정                                                          |
| --- | --------------------------- | ------------------------------------------------------------- |
| Q1  | 슬라이드 콘텐츠 수준은?     | C안 — 제목 + 핵심 키워드 수준 placeholder (내용 미확정이므로) |
| Q2  | 슬라이드 전환 애니메이션은? | B안 — 좌우 슬라이드 전환, `prefers-reduced-motion` 즉시 교체  |
| Q3  | 슬라이드 크기와 배치는?     | B안 — `aspect-video` 16:9 고정, 화면 중앙                     |
| Q4  | 네비게이션 컨트롤 위치는?   | B안 — 슬라이드 위 오버레이 화살표 버튼                        |
| Q5  | 인디케이터 위치는?          | A안 — 슬라이드 하단 중앙, `현재 / 전체` 형식                  |

**생성 문서:** `docs/features/presentation/spec-fixed.md`

---

### 2-2. PRD 뼈대 + 이슈 분해

**참조 문서:** `docs/features/presentation/spec-fixed.md`

**PRD 구조:**

- 개요 (목적, 배경, 성공 기준)
- 사용자 스토리 5개 (US-01~05)
- 기술 결정 — ADR 4개 (비워둠)
- Out of Scope (9개 카테고리)
- 용어 정의

**생성 문서:** `docs/features/presentation/prd.md`

---

### 2-3. 아키텍처 3안 제안 및 비교

**참조 문서:** `docs/features/presentation/spec-fixed.md`

**7기준 비교 (홈 페이지 6기준 → 7기준으로 확장, "핵심 동작" 추가):**

| 기준        |  안 A (자기 완결)  |  안 B (FSD 정통)  | 안 C (Widget 캡슐화)  |
| ----------- | :----------------: | :---------------: | :-------------------: |
| 데이터 구조 |     pages 내부     |   entities 분리   | entities 분리 + props |
| API 전환    | 컴포넌트 수정 필요 | entities/api 추가 | HarnessPage prop 교체 |
| 상태 관리   |     pages 내부     |  features 레이어  |  Widget 내부 캡슐화   |
| 핵심 동작   | useSlideNavigation |   features 격리   |  SlideDeck 내부 완결  |
| FSD 일관성  |         △          |       ✅✅        |  △ (widgets 첫 도입)  |
| 테스트      |     props 기반     |   레이어별 독립   | slides prop 주입 격리 |

**선택:** **안 C — `widgets/slide-deck` 캡슐화형**

**선택 이유 요약:**

1. 슬라이드 덱은 렌더링·네비게이션·키보드·상태·애니메이션이 강하게 결합된 독립 UI 시스템
2. `pages/harness`를 `<SlideDeck slides={SLIDES} />` 한 줄 수준으로 유지
3. HTML·MDX·CMS·API 등 콘텐츠 소스 변경 시 Widget 인터페이스 불변
4. `slides` prop 주입으로 독립 테스트 경계 명확

---

### 2-4. ADR 작성

**참조 문서:** `docs/features/presentation/prd.md`

| ADR                    | 결정                                                | 핵심 트레이드오프                             |
| ---------------------- | --------------------------------------------------- | --------------------------------------------- |
| ADR-01 상태 관리 위치  | `useSlideNavigation` → `SlideDeck` 내부 캡슐화      | 테스트 용이 vs 외부 제어 시 Context 추가 필요 |
| ADR-02 전환 애니메이션 | CSS `translateX` + direction state                  | 외부 의존성 없음 vs overflow 처리 주의        |
| ADR-03 데이터 구조     | `entities/slide` + `SlideDeck`은 props만 수신       | 소스 변경 무관 vs 타입 확장 시 SlideView 수정 |
| ADR-04 키보드 이벤트   | `useSlideNavigation` 내 `useEffect`로 document 구독 | 포커스 무관 동작 vs Arrow 키 충돌 위험        |

**업데이트 문서:** `docs/features/presentation/prd.md`

---

### 2-5. 이슈 분해

**참조 문서:** `docs/features/presentation/prd.md`

**수직 슬라이스 원칙 적용:** "이 이슈만 완료해도 사용자에게 보여줄 수 있는 동작이 있는가?"

| 이슈                       | 완료 시 보여줄 동작                      | 의존성 |
| -------------------------- | ---------------------------------------- | ------ |
| #1 슬라이드 덱 기본 렌더링 | `/harness` 진입 시 첫 슬라이드 16:9 표시 | 없음   |
| #2 네비게이션 + 인디케이터 | 키보드·마우스로 이동, `3 / 7` 인디케이터 | #1     |
| #3 전환 애니메이션         | 방향에 맞는 좌우 슬라이드 애니메이션     | #2     |

**생성 문서:** `docs/features/presentation/issues.md`

---

### 2-6. 구현 (Issue 1 → 2 → 3 순서)

**참조 문서:** `docs/features/presentation/issues.md`, `docs/features/presentation/prd.md`

**생성/수정 파일:**

| 파일                                             | 내용                                                   |
| ------------------------------------------------ | ------------------------------------------------------ |
| `entities/slide/model/types.ts`                  | `Slide` 인터페이스                                     |
| `entities/slide/model/constants.ts`              | `SLIDES` 배열 (placeholder 7장)                        |
| `entities/slide/index.ts`                        | barrel export                                          |
| `widgets/slide-deck/model/useSlideNavigation.ts` | currentIndex, direction, goNext/goPrev, keydown 이벤트 |
| `widgets/slide-deck/ui/SlideView.tsx`            | 슬라이드 표시 + CSS translateX 전환 애니메이션         |
| `widgets/slide-deck/ui/SlideControls.tsx`        | 오버레이 화살표 버튼, 경계 비활성화                    |
| `widgets/slide-deck/ui/SlideIndicator.tsx`       | `현재 / 전체` 인디케이터                               |
| `widgets/slide-deck/ui/SlideDeck.tsx`            | 전체 조합 컴포넌트                                     |
| `widgets/slide-deck/index.ts`                    | barrel export                                          |
| `pages/harness/ui/HarnessPage.tsx`               | placeholder 제거, `<SlideDeck slides={SLIDES} />` 연결 |

**발견 및 수정한 버그:**

- `/harness`가 새 탭으로 열릴 때 `ThemeToggle`이 없어 다크 초기화가 안 되는 문제
- 원인: `useTheme`은 `ThemeToggle`에만 있어 `/harness`에서는 훅이 실행되지 않음
- 해결: `shared/lib/theme.ts`에 `initTheme()` 함수 추가 → `app/providers/index.tsx`에 `ThemeBootstrap` 컴포넌트로 마운트 → 모든 페이지에서 다크 기본값 초기화 보장

**Playwright 검증 결과 (전체 PASS):**

- 첫 슬라이드 제목 "문제 제기", bullets 3개 렌더 확인
- `aspect ratio: 1.78` (16:9) 확인
- `인디케이터: 1 / 7`
- ArrowRight → "제안하는 파이프라인" + `2 / 7`
- 다음 버튼 클릭 → `3 / 7`
- ArrowLeft → `2 / 7`
- 첫 슬라이드 이전 버튼 `disabled: true`
- 마지막 슬라이드 다음 버튼 `disabled: true` + `7 / 7`
- `/harness` 다크모드: system=light에서도 `class: dark` 확인

**커밋:** `feat: 프레젠테이션 슬라이드 덱 구현 (widgets/slide-deck)`

---

## 전체 산출물 목록

### 문서

| 파일                                          | 설명                                                      |
| --------------------------------------------- | --------------------------------------------------------- |
| `docs/features/home/spec-original.md`         | 홈 페이지 기본 기능 정의서 (입력)                         |
| `docs/features/home/spec-fixed.md`            | Q&A로 확정된 홈 페이지 스펙                               |
| `docs/features/home/prd.md`                   | 홈 페이지 PRD (사용자 스토리 + ADR 4개 + Out of Scope)    |
| `docs/features/presentation/spec-original.md` | 프레젠테이션 기본 기능 정의서 (입력)                      |
| `docs/features/presentation/spec-fixed.md`    | Q&A로 확정된 프레젠테이션 스펙                            |
| `docs/features/presentation/prd.md`           | 프레젠테이션 PRD (사용자 스토리 + ADR 4개 + Out of Scope) |
| `docs/features/presentation/issues.md`        | 수직 슬라이스 이슈 3개 + AC + GitHub 등록 명령어          |

### 주요 소스 파일

| 레이어     | 파일                                            |
| ---------- | ----------------------------------------------- |
| `entities` | `presentation/`, `slide/`                       |
| `features` | `toggle-theme/`, `toggle-routine/`              |
| `widgets`  | `slide-deck/`                                   |
| `pages`    | `home/`, `harness/`                             |
| `shared`   | `lib/theme.ts`, `lib/utils.ts`, `ui/Button.tsx` |
| `app`      | `providers/index.tsx` (ThemeBootstrap 포함)     |

---

## 반복된 워크플로우 패턴

이번 세션에서 두 기능(홈 페이지, 프레젠테이션 페이지)에 동일하게 적용한 패턴:

```
spec-original.md 읽기
  → Q&A (1문1답, 추천 이유 포함)
  → spec-fixed.md 생성
  → PRD 뼈대 작성 (ADR 비워둠)
  → 아키텍처 3안 비교표
  → 사용자 선택
  → ADR 4요소 작성 (Context / Decision / Alternatives+이유 / Consequences 장단)
  → 이슈 분해 (수직 슬라이스 + Given-When-Then AC)
  → 순차 구현 (Issue 1 → 2 → 3)
  → Playwright 검증
  → 커밋
```

이 패턴 자체가 **Claude Code Harness 발표의 핵심 시연 내용**이다.
