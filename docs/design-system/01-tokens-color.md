# Color Tokens

## 철학

색상은 **Palette → Semantic Token → Component** 순서로 사용한다.

```txt
Palette
↓
Semantic Token
↓
Component
```

컴포넌트에서는 Primary 500, Gray 700 같은 팔레트 값을 직접 사용하지 않는다.

항상 Semantic Token을 통해 사용한다.

```tsx
// ❌
<div className="bg-[#4F46E5]" />

// ❌
<div className="bg-violet-600" />

// ✅
<div className="bg-primary" />
```

---

# Semantic Tokens

## Light / Dark Mapping

| Token                         | Light                 | Dark               | 역할                   |
| ----------------------------- | --------------------- | ------------------ | ---------------------- |
| `--background`                | `#FBF9F9`             | `#0F1115`          | 페이지 배경            |
| `--surface`                   | `#FBF9F9`             | `#171923`          | 기본 Surface           |
| `--surface-dim`               | `#DBDAD9`             | `#111318`          | 비활성 Surface         |
| `--surface-container-lowest`  | `#FFFFFF`             | `#0F1115`          | 최하위 컨테이너        |
| `--surface-container-low`     | `#F5F3F3`             | `#171923`          | 카드 배경              |
| `--surface-container`         | `#EFEDED`             | `#1D2130`          | 카드 내부 섹션         |
| `--surface-container-high`    | `#E9E8E7`             | `#202433`          | 강조 영역              |
| `--surface-container-highest` | `#E3E2E2`             | `#262B3A`          | 코드 블록·비활성       |
| `--surface-hover`             | `#F3F2F2`             | `#1D2130`          | Hover 상태             |
| `--surface-active`            | `#ECEBEB`             | `#202433`          | Active 상태            |
| `--surface-elevated`          | `#FFFFFF`             | `#202433`          | Modal·Dropdown         |
| `--surface-overlay`           | `rgba(17,17,17,0.48)` | `rgba(0,0,0,0.56)` | Overlay                |
| `--on-surface`                | `#1B1C1C`             | `#F3F4F6`          | 기본 텍스트            |
| `--on-surface-variant`        | `#464555`             | `#A1A1AA`          | 보조 텍스트            |
| `--outline`                   | `#777587`             | `#525866`          | 강조 Border            |
| `--outline-variant`           | `#C7C4D8`             | `#343741`          | Ghost Border           |
| `--primary`                   | `#3525CD`             | `#4F46E5`          | CTA                    |
| `--on-primary`                | `#FFFFFF`             | `#FFFFFF`          | Primary 위 텍스트      |
| `--primary-container`         | `#4F46E5`             | `#3730A3`          | Primary Container      |
| `--on-primary-container`      | `#DAD7FF`             | `#DAD7FF`          | Primary Container Text |
| `--secondary`                 | `#0051D5`             | `#2563EB`          | 정보성 액션            |
| `--on-secondary`              | `#FFFFFF`             | `#FFFFFF`          | Secondary Text         |
| `--error`                     | `#BA1A1A`             | `#FFB4AB`          | Error                  |
| `--on-error`                  | `#FFFFFF`             | `#690005`          | Error Text             |
| `--error-container`           | `#FFDAD6`             | `#93000A`          | Error Background       |

---

# Palette

Palette는 CSS 변수 정의 전용이다.

컴포넌트에서 직접 사용하지 않는다.

## Primary

| 0    | 50      | 100     | 200     | 300     | 400     | 500     | 600     | 700     | 800     | 900     |
| ---- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| #FFF | #F5F7FF | #EEF2FF | #DDE5FF | #C7D2FE | #A5B4FC | #4F46E5 | #4338CA | #3730A3 | #312E81 | #1E1B4B |

## Secondary

| 0    | 50      | 100     | 500     | 700     |
| ---- | ------- | ------- | ------- | ------- |
| #FFF | #F8FBFF | #EFF6FF | #2563EB | #1E40AF |

## Accent

| 0    | 100     | 500     | 700     |
| ---- | ------- | ------- | ------- |
| #FFF | #FEF3C7 | #F59E0B | #B45309 |

## Neutral

| 0    | 50      | 100     | 200     | 300     | 400     | 500     | 600     | 700     | 800     | 900     |
| ---- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| #FFF | #F8FAFC | #F1F5F9 | #E5EAF0 | #D7DEE8 | #A1A1AA | #757575 | #52525B | #3F3F46 | #27272A | #111111 |

---

# Tailwind Usage

## Background

```tsx
<div className="bg-background" />
<div className="bg-surface-container-low" />
<div className="bg-surface-container" />
<div className="bg-surface-container-high" />
```

## Text

```tsx
<p className="text-on-surface" />
<p className="text-on-surface-variant" />
```

## CTA

```tsx
<button className="bg-primary text-on-primary" />
```

## Error

```tsx
<div className="bg-error-container text-error" />
```

## Border

```tsx
<input className="border-outline-variant rounded-xl border" />
```

---

# Do

```tsx
<Card className="bg-surface-container-low">
  <h2 className="text-on-surface">제목</h2>

  <p className="text-on-surface-variant">설명</p>
</Card>
```

---

# Don't

```tsx
// ❌ Hex 직접 사용
<div className="bg-[#4F46E5]" />

// ❌ Palette 직접 사용
<div className="bg-violet-600" />

// ❌ Gray 직접 사용
<div className="text-gray-500" />

// ❌ Semantic Token 우회
<div className="border-gray-300" />
```
