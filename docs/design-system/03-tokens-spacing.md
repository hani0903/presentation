# Spacing & Layout Tokens

## 원칙

간격은 **4px 기반 스케일**을 따르되, 실제 사용은 8px 단위 이상을 기본으로 한다.

일반 앱 UI와 발표용 슬라이드는 같은 spacing을 공유하지 않는다.

```txt
App UI
→ 밀도 높은 정보 탐색

Presentation
→ 멀리서 읽히는 큰 여백과 명확한 시선 흐름
```

---

## App Spacing Scale

| 토큰       | 값   | Tailwind | 사용처             |
| ---------- | ---- | -------- | ------------------ |
| `space-1`  | 4px  | `gap-1`  | 미세 조정          |
| `space-2`  | 8px  | `gap-2`  | 아이콘–텍스트      |
| `space-3`  | 12px | `gap-3`  | 작은 그룹 내부     |
| `space-4`  | 16px | `gap-4`  | 기본 요소 간격     |
| `space-6`  | 24px | `gap-6`  | 카드 내부, 폼 필드 |
| `space-8`  | 32px | `gap-8`  | 섹션 내 주요 그룹  |
| `space-12` | 48px | `gap-12` | 섹션 간격          |
| `space-16` | 64px | `gap-16` | 히어로 여백        |

---

## Presentation Spacing Scale

발표용 슬라이드는 16:9 데스크톱 화면 기준으로 설계한다.

| 토큰                   | 값    | Tailwind | 사용처                      |
| ---------------------- | ----- | -------- | --------------------------- |
| `presentation-gap-sm`  | 24px  | `gap-6`  | 아이콘·라벨·작은 메타 정보  |
| `presentation-gap-md`  | 40px  | `gap-10` | 제목과 본문 사이            |
| `presentation-gap-lg`  | 64px  | `gap-16` | 주요 콘텐츠 블록 사이       |
| `presentation-gap-xl`  | 96px  | `gap-24` | 슬라이드 내 큰 섹션 분리    |
| `presentation-gap-2xl` | 128px | `gap-32` | 히어로 슬라이드의 강한 여백 |

---

## Layout Width

| 토큰                      | 값     | Tailwind        | 사용처             |
| ------------------------- | ------ | --------------- | ------------------ |
| `page-max-width`          | 1280px | `max-w-7xl`     | 일반 페이지        |
| `hero-max-width`          | 1024px | `max-w-5xl`     | 랜딩 히어로        |
| `text-max-width`          | 768px  | `max-w-3xl`     | 본문 텍스트        |
| `slide-max-width`         | 1440px | `max-w-[90rem]` | 발표 슬라이드 전체 |
| `slide-text-max-width`    | 960px  | `max-w-[60rem]` | 발표 본문          |
| `slide-diagram-max-width` | 1120px | `max-w-[70rem]` | 다이어그램         |

---

## App Layout Defaults

| 영역      | 모바일         | 데스크톱       |
| --------- | -------------- | -------------- |
| 수평 패딩 | `px-4` (16px)  | `px-6` (24px)  |
| 수직 여백 | `py-10` (40px) | `py-16` (64px) |
| 카드 패딩 | `p-4` (16px)   | `p-6` (24px)   |
| 요소 gap  | `gap-6` (24px) | `gap-8` (32px) |

---

## Presentation Layout Defaults

| 영역                      | 권장값 | Tailwind    |
| ------------------------- | ------ | ----------- |
| 슬라이드 최소 높이        | 100svh | `min-h-svh` |
| 슬라이드 수평 패딩        | 96px   | `px-24`     |
| 슬라이드 수직 패딩        | 80px   | `py-20`     |
| 히어로 슬라이드 수평 패딩 | 112px  | `px-28`     |
| 히어로 슬라이드 수직 패딩 | 96px   | `py-24`     |
| 슬라이드 내부 기본 gap    | 40px   | `gap-10`    |
| 큰 콘텐츠 블록 gap        | 64px   | `gap-16`    |
| 카드/패널 padding         | 32px   | `p-8`       |
| 다이어그램 padding        | 40px   | `p-10`      |

---

## Tailwind Usage

### App UI

```tsx
<section className="px-4 py-10 md:px-6 md:py-16">
  <div className="mx-auto flex max-w-7xl flex-col gap-8">...</div>
</section>
```

### Presentation Slide

```tsx
<section className="flex min-h-svh items-center px-24 py-20">
  <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-10">...</div>
</section>
```

### Presentation Hero Slide

```tsx
<section className="flex min-h-svh items-center px-28 py-24">
  <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-16">...</div>
</section>
```

---

## Do

```tsx
<section className="min-h-svh px-24 py-20">
  <div className="mx-auto max-w-[90rem]">...</div>
</section>
```

---

## Don't

```tsx
// ❌ 발표 슬라이드에 앱 기준 패딩 사용
<section className="px-6 py-16" />

// ❌ 임의 픽셀 spacing 사용
<div className="mt-[37px]" />

// ❌ 콘텐츠를 화면 가장자리까지 밀착
<section className="px-4" />
```
