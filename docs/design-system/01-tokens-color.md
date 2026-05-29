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

## 팔레트 (CSS 변수 정의 전용)

|               | 0    | 50      | 100     | 200     | 300     | 400     | 500     | 600     | 700     | 800     | 900     |
| ------------- | ---- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| **Primary**   | #FFF | #F5F7FF | #EEF2FF | #DDE5FF | #C7D2FE | #A5B4FC | #4F46E5 | #4338CA | #3730A3 | #312E81 | #1E1B4B |
| **Secondary** | #FFF | #F8FBFF | #EFF6FF | —       | —       | —       | #2563EB | —       | #1E40AF | —       | —       |
| **Accent**    | #FFF | —       | #FEF3C7 | —       | —       | —       | #F59E0B | —       | #B45309 | —       | —       |
| **Neutral**   | #FFF | #F8FAFC | #F1F5F9 | #E5EAF0 | #D7DEE8 | #A1A1AA | #757575 | #52525B | #3F3F46 | #27272A | #111111 |

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
