<!-- 세션 시작 시 자동으로 로드되는 프로젝트 규칙집 -->

# Loop-in

## Project Overview

pnpm + Vite 단일 SPA. React 19 / TypeScript / React Router v7. 프론트엔드 개발자를 위한 학습 관리 및 퀴즈 풀이 앱

## Commands

```bash
# Development
pnpm dev          # Dev server on http://localhost:5173
pnpm build        # Production build (tsc -b && vite build)
pnpm preview      # Serve production build

# Code Quality
pnpm lint         # eslint .
```

## Tech Stack

- **Build**: Vite 6 + @vitejs/plugin-react
- **UI**: React 19, Tailwind CSS v4 + tw-animate-css
- **State**: Zustand v5 (client) + TanStack Query v5 (server)
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 + `tw-animate-css` + `tailwind-merge` + `clsx`
- **Toast**: `sonner`
- **Icons**: `lucide-react`
- **Lint**: ESLint 9 (flat config) + typescript-eslint + react-hooks + react-refresh
- **Format**: Prettier 기본값 + `prettier-plugin-tailwindcss` (className 자동 정렬)
- **Package manager**: pnpm

## FSD 아키텍처

본 프로젝트의 목표 아키텍처는 **정통 FSD 4-layer + pages 구조**다. 레이어 의존 방향(하향만 허용):

```
pages(4) → widgets(3) → features(2) → entities(1) → shared(0)
```

<!--
규칙 상세는 `.claude/rules/`:

| 파일                         | 범위                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `fsd-shared.md`              | shared 레이어 segment 표준                                                              |
| `fsd-entities.md`            | entities 레이어 (`model/`/`api/`/`ui/`/`lib/`)                                          |
| `fsd-features.md`            | features 레이어                                                                         |
| `fsd-widgets.md`             | widgets 레이어                                                                          |
| `fsd-pages.md`               | pages 레이어 + React Router v7 연계                                                     |
| `import-convention.md`       | path alias·정렬·cross-layer 규칙                                                        |
| `api-convention.md`          | TanStack Query 훅 + fetch 함수                                                          |
| `state-convention.md`        | Zustand 스토어                                                                          |
| `component-convention.md`    | named export 컴포넌트                                                                   |
| `className-convention.md`    | className 함정 (false 문자열 등)                                                        |
| `constants-convention.md`    | 상수 추출 판단                                                                          |
| `refactor-checklist.md`      | 리팩토링 모드 전용 6대 점검 항목 (FSD / 가독성 / 함수 / 모듈화 / 성능 + 사전 결정 기준) |
| `requirements-management.md` | requirements/ 디렉토리 + Changelog + mode                                               |

`PreToolUse` 훅(`.claude/hooks/fsd-layer-check.sh`)이 Edit/Write 시 import 방향과 cross-slice 위반을 차단한다.
-->

## 두 진입점, 같은 시스템

요청의 무게에 따라 진입점을 분리한다. 룰(`.claude/rules/`)과 PreToolUse 훅(`fsd-layer-check.sh`)은 두 경로 모두에서 동일하게 작동하므로 **시스템(품질 가드)은 한 벌**이고, ceremony(산출물 파일·검증 깊이)만 다르다.

| 진입점                    | source | 입력                                | 산출물 파일                                                   | 검증                                           |
| ------------------------- | ------ | ----------------------------------- | ------------------------------------------------------------- | ---------------------------------------------- |
| `ai-quick`                | quick  | 즉석 자유 텍스트 ("이거 좀 고쳐줘") | 없음                                                          | 변경 파일 한정 lite (tsc + eslint + FSD grep)  |
| `ai-pipeline` / `ai-plan` | spec   | `requirements/specs/`의 REQ 문서    | `requirements/reports/{checklists,retrospects}/REQ-{번호}.md` | 전체 (tsc + eslint + build + FSD + 체크리스트) |

승격 규칙: `ai-quick`로 시작했더라도 변경 파일이 5개를 초과하거나 cross-layer 영향이 다수 슬라이스에 전파되면 즉시 spec 모드(`ai-pipeline`)로 승격을 권유한다.

## 두 가지 작업 모드 (intent)

진입점과 직교하는 축으로, **무엇을** 하는지에 대한 모드:

- **구현 모드 (`feature`)** — 새 기능 구현. 신규 코드는 정통 FSD 규칙을 그대로 따른다.
- **리팩토링 모드 (`refactor`)** — 기존 코드를 정통 FSD 위치로 이전. plan에서 이전 매핑(현 위치 → 목표 위치)을 명시하고, 이동·rename·import 갱신을 의존 순서(shared → entities → features → widgets → pages)대로 진행한다.

<!-- 자세한 모드별 절차는 `.claude/skills/ai-plan/SKILL.md` 참조. 리팩토링 모드의 6대 점검 항목은 `.claude/rules/refactor-checklist.md`. -->

## Path Alias

`tsconfig.json`의 alias는 단 하나: `@/*` → `src/*`. 레이어별 alias가 별도로 없으므로 cross-layer 참조는 `@/<layer>/<slice>` 형태로 작성한다.

```ts
// ✅ Good
import { cn } from "@/shared/lib/utils";
import { useRoutineStore } from "@/entities/routine";

// ❌ Bad — 다른 레이어를 상대 경로로 거슬러 올라감 (FSD layer-check hook이 차단)
import { cn } from "../../../shared/lib/utils";
```

## Design System

UI·CSS·컴포넌트 작업 시 `design-system` skill을 트리거한다. 작업 후 `/design-check`로 diff 리뷰. PostToolUse 훅(`scripts/check-design-system.js`)이 `*.tsx`/`*.ts`/`*.css` 수정 시 위반 패턴을 자동 감지.

- 진입점: `docs/design-system/README.md`
- 컬러 토큰: `docs/design-system/01-tokens-color.md`
- 컴포넌트: `docs/design-system/05-components/`
- 금지 규칙: `docs/design-system/dont.md`

## Code Style

- **ESLint + Prettier**: 2-space indent, double quotes, semi — `prettier-plugin-tailwindcss`로 className 자동 정렬
- **컴포넌트**: PascalCase 파일명 (`RoutineCard.tsx`), `interface {Component}Props`, **named export만** (default export 금지)
- **그 외 함수/유틸**: kebab-case 파일명, 화살표 함수, named export
- **Boolean**: `is*` / `has*` 접두사
- **Imports**: 같은 slice는 상대 경로, 다른 레이어는 `@/...`. type-only는 `import type`

## Important Notes

- 환경변수는 `VITE_*` 접두사 (Vite 규약). 예: `import.meta.env.VITE_API_BASE_URL`
- `immer` 패키지 설치됨 — Zustand 불변 업데이트 필요 시 활용 가능
- `json-server` devDependency로 설치됨 — 로컬 mock API 서버로 활용 가능

## Feature Planning

새로운 기능 구현 전에는 `feature-planner` skill을 사용한다.

Feature Planner Workflow:

spec-original.md
↓
Spec Interview
↓
spec-fixed.md
↓
PRD + ADR
↓
issues.md

중요:

- 각 단계의 GATE를 반드시 준수한다.
- 사용자의 승인 없이 다음 단계로 진행하지 않는다.
- 아키텍처 선택은 사용자가 결정한다.
- Issue는 수직 슬라이싱 원칙을 따른다.
- Acceptance Criteria는 Given-When-Then 형식으로 작성한다.

<!--
## Workflow Skills

`.claude/skills/`에 5단계 파이프라인:

| Skill            | 진입점 | 용도                                                                           |
| ---------------- | ------ | ------------------------------------------------------------------------------ |
| `ai-quick`       | quick  | 즉석 요청 단축 경로. 계획 ceremony 없이 룰·훅만 적용, 변경 파일 한정 lite 검증 |
| `ai-plan`        | spec   | 요구사항 분석 + 구현/리팩토링 모드 결정 + FSD 구현 계획 작성                   |
| `ai-orchestrate` | spec   | shared → entities → features → widgets → pages 순으로 코드 작성/이전           |
| `ai-validate`    | spec   | tsc / eslint / build / FSD import 규칙 검증 + 체크리스트                       |
| `ai-deliver`     | spec   | barrel export 정리 + 커밋 메시지 제안 (직접 커밋 ✗)                            |
| `ai-retrospect`  | spec   | 코드 리뷰 + 회고 보고서                                                        |
| `ai-pipeline`    | spec   | 위 5단계 순차 실행                                                             |
-->
