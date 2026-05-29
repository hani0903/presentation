# ✅ Do — 허용 규칙

구현 전·후 빠르게 확인하는 최종 체크리스트다.  
상세 기준은 `00-principles.md` ~ `05-components/*` 문서를 따른다.

---

## Color

- Semantic Token만 사용한다.
- 텍스트는 `text-on-surface`, `text-on-surface-variant`를 사용한다.
- CTA는 `bg-primary text-on-primary`를 사용한다.
- 컴포넌트는 Light/Dark 색상을 직접 분기하지 않는다.

---

## Typography

- `text-display-*`, `text-heading-*`, `text-body-*`, `text-caption`만 사용한다.
- 발표용 슬라이드는 `text-display-*` 계층을 우선 사용한다.
- 코드 영역은 `font-mono`를 사용한다.

---

## Spacing

- Tailwind spacing scale만 사용한다.
- 모바일 퍼스트로 작성하고 `md:` 이상에서 확장한다.
- 발표용 슬라이드는 `px-24 py-20` 이상을 기본으로 한다.

---

## Radius

- Button · Input → `rounded-xl`
- Card · Modal · Sheet · Presentation Panel → `rounded-2xl`
- Avatar · Icon Button → `rounded-full`
- Badge · Tag · Chip → `rounded-sm`

---

## Elevation

- 영역 구분은 border보다 Surface Layering을 우선한다.
- Surface 계층은 `background → surface-container-low → surface-container → surface-container-high` 순서를 따른다.
- Ghost Border는 Input, Select, Focus Ring, Divider에만 사용한다.

---

## Shadow

- Card → `shadow-card`
- Dropdown · Popover → `shadow-floating`
- Modal → `shadow-overlay`

---

## Motion

- Easing은 `cubic-bezier(0.2, 0, 0, 1)`를 사용한다.
- Hover/Focus 120ms, 일반 전환 220ms, 페이지 진입 360ms를 기준으로 한다.
- 진입 애니메이션은 `prefers-reduced-motion`을 대응한다.

---

## Accessibility

- 버튼과 링크는 `focus-visible` 상태를 제공한다.
- 외부 링크는 `target="_blank"`와 `rel="noreferrer"`를 함께 사용한다.
- 색상만으로 상태를 표현하지 않는다.
- 주요 인터랙션은 키보드로 접근 가능해야 한다.
