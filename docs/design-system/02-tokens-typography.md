# Typography Tokens

## 폰트 패밀리

| 역할 | 값                                                   |
| ---- | ---------------------------------------------------- |
| 본문 | `Pretendard, system-ui, sans-serif`                  |
| 코드 | `JetBrains Mono Variable, JetBrains Mono, monospace` |
| 로고 | `Fredoka Variable, Fredoka, sans-serif`              |

---

## 타입 스케일

| 토큰                    | 크기 | 굵기 | 행간 | 자간     | 사용처                    |
| ----------------------- | ---- | ---- | ---- | -------- | ------------------------- |
| `text-display-1`        | 96px | 700  | 1.05 | -0.05em  | 발표 슬라이드 메인 타이틀 |
| `text-display-2`        | 80px | 700  | 1.08 | -0.045em | 발표 섹션 타이틀          |
| `text-heading-1`        | 64px | 700  | 1.12 | -0.04em  | 히어로/페이지 메인        |
| `text-heading-1-mobile` | 40px | 700  | 1.2  | -0.04em  | 모바일 히어로             |
| `text-heading-2`        | 44px | 700  | 1.18 | -0.03em  | 섹션 타이틀               |
| `text-heading-3`        | 32px | 700  | 1.25 | -0.02em  | 서브 섹션                 |
| `text-heading-4`        | 24px | 700  | 1.35 | -0.01em  | 카드 제목                 |
| `text-body-1`           | 22px | 400  | 1.65 | -0.01em  | 리드 문단                 |
| `text-body-2`           | 18px | 400  | 1.7  | -0.01em  | 기본 본문                 |
| `text-body-3`           | 16px | 400  | 1.65 | -0.005em | 보조 설명                 |
| `text-caption`          | 13px | 400  | 1.5  | 0        | 캡션·메타                 |
| `text-button`           | 16px | 600  | 1    | -0.01em  | 버튼 레이블               |
| `text-code-display`     | 15px | 400  | 1.6  | 0        | 코드 블록                 |

---

## Tailwind Usage

```tsx
<h1 className="text-display-1">
  디자인에서 커밋까지
</h1>

<h2 className="text-heading-2">
  AI 기반 컴포넌트 자동화 파이프라인
</h2>

<p className="text-body-2 text-on-surface-variant">
  사람이 기억하고 지키는 규칙을 시스템이 대신 처리한다.
</p>

<code className="font-mono text-code-display">
  git commit
</code>
```
