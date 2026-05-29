# Elevation

## 철학

Elevation은 그림자보다 **톤(Tone)** 으로 표현한다.

명시적인 선(border)이나 강한 그림자보다 Surface 계층의 차이를 활용해 시각적 깊이를 만든다.

```txt
Background
↓
Surface Container Low
↓
Surface Container
↓
Surface Container High
↓
Surface Container Highest
```

Elevation은 "얼마나 떠 있는가"보다 "어떤 계층에 속하는가"를 표현한다.

---

# Tonal Layering

배경 톤 차이로 시각적 계층을 만든다.

선 대신 면으로 구분한다.

```txt
페이지 배경
(background)

└── 카드
    (surface-container-low)

      └── 카드 내부 섹션
          (surface-container)

            └── 강조 셀
                (surface-container-high)

                  └── 코드 블록
                      (surface-container-highest)
```

---

## Layer Rules

레이어를 건너뛰지 않는다.

```txt
background
↓
surface-container-low
```

✅ 허용

---

```txt
background
↓
surface-container-highest
```

❌ 금지

대비가 지나치게 강해진다.

---

## Tailwind Usage

```tsx
<section className="bg-background">
  <div className="bg-surface-container-low">
    <div className="bg-surface-container">
      <div className="bg-surface-container-high">...</div>
    </div>
  </div>
</section>
```

---

# Shadow Tokens

그림자는 최소한으로 사용한다.

Shadow는 Elevation을 만드는 수단이 아니라,
Tonal Layering을 보조하는 수단이다.

---

| 토큰              | 값                                | 사용처            |
| ----------------- | --------------------------------- | ----------------- |
| `shadow-card`     | `0 4px 20px rgba(15,23,42,0.06)`  | 카드              |
| `shadow-floating` | `0 12px 40px rgba(15,23,42,0.12)` | 드롭다운, Popover |
| `shadow-overlay`  | `0 24px 64px rgba(15,23,42,0.18)` | Modal             |

---

## Tailwind Usage

```tsx
<Card className="shadow-card" />

<Dropdown className="shadow-floating" />

<Modal className="shadow-overlay" />
```

---

## 금지

```tsx
// ❌ Tailwind 기본 강한 그림자
shadow-lg
shadow-xl
shadow-2xl
shadow-3xl
```

---

```css
/* ❌ 직접 그림자 작성 */
box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
```

---

# Ghost Border

경계선이 꼭 필요한 경우에만 사용한다.

Ghost Border는 영역을 나누기 위한 선이 아니라
상태를 표현하기 위한 보조 요소다.

---

## 사용 대상

- Input
- Textarea
- Select
- Focus Ring
- Divider

---

## 사용 금지

- Card
- Button
- Modal
- Section

---

## Tailwind Usage

```tsx
<div className="border-outline-variant rounded-xl border">입력 필드</div>
```

---

## Focus Example

```tsx
<input className="border-outline-variant focus:border-primary rounded-xl border" />
```

---

# Dark Mode

Elevation 전용 다크 모드 토큰은 만들지 않는다.

Semantic Color Token이 자동으로 교체된다.

---

```tsx
<div className="bg-surface-container-low" />
```

라이트 모드

```txt
#F5F3F3
```

---

다크 모드

```txt
#171923
```

---

컴포넌트는 다크 모드를 의식하지 않는다.

Semantic Token만 사용한다.

---

# Presentation Elevation

발표용 HTML 슬라이드에서는 Elevation보다 정보 계층이 중요하다.

---

| 요소              | 토큰                        |
| ----------------- | --------------------------- |
| Slide Background  | `background`                |
| Diagram Container | `surface-container-low`     |
| Callout           | `surface-container-high`    |
| Code Block        | `surface-container-highest` |
| Highlight Panel   | `surface-container-high`    |

---

## Example

```tsx
<section className="bg-background">
  <div className="bg-surface-container-low rounded-2xl p-10">
    다이어그램
    <div className="bg-surface-container-high rounded-xl p-8">핵심 메시지</div>
  </div>
</section>
```

---

# Do

```tsx
<Card className="bg-surface-container-low shadow-card">
  <CardContent className="bg-surface-container">...</CardContent>
</Card>
```

---

```tsx
<div className="bg-surface-container-high">중요 정보</div>
```

---

# Don't

```tsx
// ❌ border로 카드 구분
<Card className="border border-gray-200" />
```

---

```tsx
// ❌ 과도한 그림자
<Card className="shadow-2xl" />
```

---

```tsx
// ❌ 배경에서 highest로 점프
<div className="bg-background">
  <div className="bg-surface-container-highest" />
</div>
```

---

```tsx
// ❌ 버튼에 Ghost Border 사용
<Button className="border-outline-variant border" />
```
