---
name: design-system
description: "UI·CSS·컴포넌트 스타일 작업 시 트리거 — 디자인 시스템 토큰·원칙·컴포넌트 규칙을 로드하여 일관된 스타일 구현을 보조한다"
argument-hint: <컴포넌트명 또는 작업 설명>
---

# Design System Reference

## 트리거 조건

다음 작업을 시작하기 전에 이 스킬을 실행한다:

- 새 컴포넌트 UI 구현
- className / CSS 수정
- 색상·타이포·간격·모션 관련 변경
- 다크 모드 대응

## 핵심 원칙 (암기)

| 원칙            | 규칙                                        |
| --------------- | ------------------------------------------- |
| **No-Line**     | border 대신 surface-container 계층으로 구분 |
| **Tonal Depth** | lowest→low→default→high→highest 순서 준수   |
| **Calm Motion** | easing-standard + 360ms 이하, bounce 금지   |

## 빠른 참조

### 컴포넌트 반경

- Button · Input → `rounded-xl`
- Card · Modal → `rounded-2xl`
- Avatar · Icon Button → `rounded-full`
- Badge · Chip → `rounded-sm`

### 색상 역할

- CTA → `--primary`
- 정보성 → `--secondary`
- 보상·XP → `--accent-500` 전용
- 기본 텍스트 → `--on-surface`
- 보조 텍스트 → `--on-surface-variant`

### Motion

- 호버: `120ms cubic-bezier(0.2,0,0,1)`
- 일반: `220ms cubic-bezier(0.2,0,0,1)`
- 진입: `360ms cubic-bezier(0.2,0,0,1)`

## 상세 파일

| 필요한 정보      | 파일                                         |
| ---------------- | -------------------------------------------- |
| 전체 컬러 토큰   | `docs/design-system/01-tokens-color.md`      |
| 타입 스케일      | `docs/design-system/02-tokens-typography.md` |
| 간격·레이아웃    | `docs/design-system/03-tokens-spacing.md`    |
| Elevation·Shadow | `docs/design-system/04-elevation.md`         |
| 허용 규칙 전체   | `docs/design-system/do.md`                   |
| 금지 패턴 전체   | `docs/design-system/dont.md`                 |

## 작업 체크리스트

구현 후 다음을 확인한다:

- [ ] hex 하드코딩 없음 (CSS 변수만 사용)
- [ ] 타입 스케일 허용 크기만 사용 (96/80/64/44/40/32/24/22/18/16/15/13px)
- [ ] 임의 픽셀 간격 없음 (gap 스케일 사용)
- [ ] 컴포넌트별 반경 규칙 준수
- [ ] shadow-xl/2xl 미사용
- [ ] bounce/spring 이징 미사용
- [ ] 라이트/다크 모두 대응
- [ ] prefers-reduced-motion 대응
