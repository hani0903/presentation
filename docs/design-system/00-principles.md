# Design Principles

## No-Line

명시적인 선(`border: 1px solid`)으로 영역을 구분하지 않는다.
대신 배경 톤 차이(surface-container 계층)로 경계를 암시한다.

```css
/* ❌ 선으로 구분 */
.card {
  border: 1px solid #e5e7eb;
}

/* ✅ 톤으로 구분 */
.card {
  background: var(--surface-container-low);
}
.card-inner {
  background: var(--surface-container);
}
```

경계선이 꼭 필요한 경우(입력 필드 포커스 등)에만 `outline-variant`(Ghost Border)를 사용한다.

---

### Tailwind Usage

```ts
// ❌ border로 카드 구분
<div className="border border-gray-200" />

// ✅ surface 계층으로 구분
<div className="bg-surface-container-low">
  <div className="bg-surface-container">
    ...
  </div>
</div>
```

---

## Tonal Depth

5단계 surface-container 계층으로 시각적 깊이를 표현한다.

```
surface-container-lowest  →  가장 밝음 (페이지 배경과 거의 같음)
surface-container-low     →  카드 배경
surface-container         →  카드 내부 섹션
surface-container-high    →  강조 영역
surface-container-highest →  가장 어두움 (비활성, 코드 블록 등)
```

레이어를 건너뛰지 않는다. `lowest` 바로 위에 `highest`를 쓰면 대비가 너무 강해진다.

---

## Calm Motion

모션은 **존재감 없이 자연스럽게** 흘러야 한다.

- Easing: `cubic-bezier(0.2, 0, 0, 1)` — 빠르게 출발, 부드럽게 정착
- Duration: 호버 120ms / 일반 220ms / 진입 360ms
- 금지: bounce, spring, 500ms 이상, 동시 다중 애니메이션

---

## Technical Clarity

정보 계층을 타이포그래피와 색상으로 명확하게 표현한다.

- 제목은 타입 스케일 순서대로 내려간다 (title-1 → title-2 → title-3)
- 보조 정보는 `on-surface-variant` 색상으로 낮춘다
- 코드·기술 표기는 `JetBrains Mono` 고수
