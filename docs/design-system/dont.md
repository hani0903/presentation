# 🚫 Don't — 금지 패턴

hook 스크립트(`scripts/check-design-system.js`)가 아래 패턴을 자동 감지한다.

## Color

- 임의 hex 하드코딩 금지: `#3B82F6`, `#1B1C1C` 등 → CSS 변수 사용
  - GREP: `/#[0-9A-Fa-f]{3,6}/`
- 팔레트 스케일 className 직접 사용 금지: `primary-500`, `neutral-700` 등
  - GREP: `/(?:primary|secondary|accent|neutral)-[0-9]{2,3}/`
- `accent` 색상을 CTA·일반 링크에 사용 금지
- 다크 모드 미대응 단일 색상 지정 금지

## Typography

- 스케일 외 임의 크기 금지: `text-[15px]`, `text-[17px]`, `text-[22px]` 등
  - GREP: `/text-\[(?!(?:60|40|36|28|20|16|14|12)px)\d+px\]/`
- 본문·설명에 `font-bold`(700) 남용 금지
- `text-caption`(12px)을 본문 역할에 사용 금지

## Spacing

- 임의 픽셀 gap/margin/padding 금지: `mt-[13px]`, `gap-[7px]` 등
  - GREP: `/[mp][tblrxy]?-\[\d+px\]/`
- 본문 텍스트 `w-full` 금지 → `max-w-[48rem]` 필수

## Radius

- 버튼에 `rounded-full` 금지 (아이콘 버튼 전용)
  - 버튼 컴포넌트 내 `rounded-full` 탐지
- 카드에 `rounded-lg` 이하 금지

## Shadow

- `shadow-xl`, `shadow-2xl`, `shadow-3xl` 금지
  - GREP: `/shadow-(?:xl|2xl|3xl)/`
- 인라인 `box-shadow` 하드코딩 금지
  - GREP: `/box-shadow:/`

## Motion

- bounce/spring 이징 금지: `cubic-bezier(0.34, 1.56, ...)`
  - GREP: `/cubic-bezier\(0\.34/`
- 500ms 이상 전환 금지
  - GREP: `/duration-\[(?:[5-9]\d{2}|\d{4,})ms\]/`
- `transition: all` 사용 금지 → 필요한 속성만 명시
  - GREP: `/transition:\s*all/`

## Elevation (No-Line)

- `border.*solid` 명시적 선 금지 (Ghost Border 제외)
  - GREP: `/border-(?:black|gray|slate|zinc|neutral|stone)-/`
- `border: 1px solid` 인라인 스타일 금지
  - GREP: `/border:\s*1px\s*solid/`
