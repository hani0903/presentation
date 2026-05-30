# Color Tokens

## 라이트 모드 — 시맨틱 토큰

| 토큰                          | 값                    | 역할                   |
| ----------------------------- | --------------------- | ---------------------- |
| `--background`                | `#FBF9F9`             | 페이지 배경            |
| `--surface`                   | `#FBF9F9`             | 기본 Surface           |
| `--surface-dim`               | `#DBDAD9`             | 비활성 Surface         |
| `--surface-container-lowest`  | `#FFFFFF`             | 최하위 컨테이너        |
| `--surface-container-low`     | `#F5F3F3`             | 카드 배경              |
| `--surface-container`         | `#EFEDED`             | 카드 내부 섹션         |
| `--surface-container-high`    | `#E9E8E7`             | 강조 영역              |
| `--surface-container-highest` | `#E3E2E2`             | 코드 블록·비활성       |
| `--surface-hover`             | `#F3F2F2`             | Hover 상태             |
| `--surface-active`            | `#ECEBEB`             | Active 상태            |
| `--surface-elevated`          | `#FFFFFF`             | Modal·Dropdown         |
| `--surface-overlay`           | `rgba(17,17,17,0.48)` | Overlay                |
| `--on-surface`                | `#1B1C1C`             | 기본 텍스트            |
| `--on-surface-variant`        | `#464555`             | 보조 텍스트            |
| `--outline`                   | `#777587`             | 강조 Border            |
| `--outline-variant`           | `#C7C4D8`             | Ghost Border           |
| `--primary`                   | `#3525CD`             | CTA                    |
| `--on-primary`                | `#FFFFFF`             | Primary 위 텍스트      |
| `--primary-container`         | `#4F46E5`             | Primary Container      |
| `--on-primary-container`      | `#DAD7FF`             | Primary Container Text |
| `--secondary`                 | `#0051D5`             | 정보성 액션            |
| `--on-secondary`              | `#FFFFFF`             | Secondary Text         |
| `--error`                     | `#BA1A1A`             | Error                  |
| `--on-error`                  | `#FFFFFF`             | Error Text             |
| `--error-container`           | `#FFDAD6`             | Error Background       |

---

## 다크 모드 토큰

| 토큰                          | 값                 |
| ----------------------------- | ------------------ |
| `--background`                | `#0F1115`          |
| `--surface`                   | `#171923`          |
| `--surface-dim`               | `#111318`          |
| `--surface-container-lowest`  | `#0F1115`          |
| `--surface-container-low`     | `#171923`          |
| `--surface-container`         | `#1D2130`          |
| `--surface-container-high`    | `#202433`          |
| `--surface-container-highest` | `#262B3A`          |
| `--surface-hover`             | `#1D2130`          |
| `--surface-active`            | `#202433`          |
| `--surface-elevated`          | `#202433`          |
| `--surface-overlay`           | `rgba(0,0,0,0.56)` |
| `--on-surface`                | `#F3F4F6`          |
| `--on-surface-variant`        | `#A1A1AA`          |
| `--outline`                   | `#525866`          |
| `--outline-variant`           | `#343741`          |
| `--primary`                   | `#4F46E5`          |
| `--on-primary`                | `#FFFFFF`          |
| `--primary-container`         | `#3730A3`          |
| `--on-primary-container`      | `#DAD7FF`          |
| `--secondary`                 | `#2563EB`          |
| `--on-secondary`              | `#FFFFFF`          |
| `--error`                     | `#FFB4AB`          |
| `--on-error`                  | `#690005`          |
| `--error-container`           | `#93000A`          |

---

## 팔레트 스케일

강조·위계 표현에 선택적으로 사용한다. **권장 단계: 100 · 200 · 300 · 500 · 700**

| 단계 | 용도                           |
| ---- | ------------------------------ |
| 100  | 배경 틴트, 뱃지 배경           |
| 200  | 서브 배경, 호버 틴트           |
| 300  | 보조 강조, 비활성 포인트       |
| 500  | 포인트 색상, 아이콘 강조       |
| 700  | 진한 강조, 다크 배경 위 텍스트 |

### Primary (Indigo)

| 단계 | 값        | Tailwind 클래스  |
| ---- | --------- | ---------------- |
| 50   | `#eef2ff` | `bg-primary-50`  |
| 100  | `#e0e7ff` | `bg-primary-100` |
| 200  | `#c7d2fe` | `bg-primary-200` |
| 300  | `#a5b4fc` | `bg-primary-300` |
| 400  | `#818cf8` | `bg-primary-400` |
| 500  | `#6366f1` | `bg-primary-500` |
| 600  | `#4f46e5` | `bg-primary-600` |
| 700  | `#4338ca` | `bg-primary-700` |
| 800  | `#3730a3` | `bg-primary-800` |
| 900  | `#312e81` | `bg-primary-900` |

### Orange (강조·경고)

| 단계 | 값        | Tailwind 클래스 |
| ---- | --------- | --------------- |
| 100  | `#ffedd5` | `bg-orange-100` |
| 200  | `#fed7aa` | `bg-orange-200` |
| 300  | `#fdba74` | `bg-orange-300` |
| 500  | `#f97316` | `bg-orange-500` |
| 700  | `#c2410c` | `bg-orange-700` |

### Green (성공·완료)

| 단계 | 값        | Tailwind 클래스 |
| ---- | --------- | --------------- |
| 100  | `#dcfce7` | `bg-green-100`  |
| 200  | `#bbf7d0` | `bg-green-200`  |
| 300  | `#86efac` | `bg-green-300`  |
| 500  | `#22c55e` | `bg-green-500`  |
| 700  | `#15803d` | `bg-green-700`  |

> 기능적 색상(CTA·텍스트·에러·배경)은 반드시 시맨틱 토큰을 사용한다. 팔레트 스케일은 강조·위계·장식 목적에만 허용한다.

---

## Tailwind Usage

| 디자인 토큰                | Tailwind 클래스             |
| -------------------------- | --------------------------- |
| `--background`             | `bg-background`             |
| `--surface-container-low`  | `bg-surface-container-low`  |
| `--surface-container`      | `bg-surface-container`      |
| `--surface-container-high` | `bg-surface-container-high` |
| `--on-surface`             | `text-on-surface`           |
| `--on-surface-variant`     | `text-on-surface-variant`   |
| `--primary`                | `bg-primary`                |
| `--on-primary`             | `text-on-primary`           |
| `--error`                  | `bg-error`                  |
| `--outline-variant`        | `border-outline-variant`    |
|                            |                             |
