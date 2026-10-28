# music-recommendation-swems

곡의 감정을 다섯 지수로 표현하고, 감정이 닮은 곡을 추천하는 **SWEMS 알고리즘 데모 페이지**입니다.
정적 HTML 시안(감성 리스닝룸)을 React + TypeScript로 다시 구현했습니다.

## SWEMS

- 곡마다 다섯 감성 지수를 1~7점으로 매깁니다: **S**weet(달콤함) · **W**arm(따뜻함) · **E**nthusiastic(열정) · **M**odern(세련됨) · **S**orrow(슬픔)
- 두 곡 사이의 유클리드 거리 `d(A, B) = √Σ (A[k] − B[k])²`가 짧을수록 감정이 닮은 곡으로 보고 추천합니다.
- 연구 원문: [`Final.pdf`](Final.pdf)

## 주요 기능

- **감정 조절**: 슬라이더 5개로 원하는 감정을 정하면, 그와 가장 가까운 곡 4곡을 보여줍니다.
- **곡 찾아보기**: 곡을 검색하고 선택하면 다섯 지수를 레이더 차트로 보여주고, 가장 가까운 곡 3곡을 추천합니다. (`⌘K`/`Ctrl+K`로 검색창 이동)
- **다크 모드**: 선택한 테마를 기억합니다. `?theme=dark`처럼 주소로 지정할 수도 있습니다.

## 기술 스택

React 19 · TypeScript 7 (strict) · Vite 8 · 컴포넌트별 CSS

## 시작하기

Node.js 22.12 이상이 필요합니다.

```bash
npm install
npm run dev          # 개발 서버 http://localhost:5173
npm run build        # 타입 검사 + 프로덕션 빌드 (dist/)
npm run preview      # 빌드 결과 미리보기
```

## 프로젝트 구조

```
src/
├── components/   # Atomic Design: atoms → molecules → organisms → templates → pages
├── hooks/        # useSongs(데이터 로딩), useTheme, useMoodProfile, useFocusShortcut
├── lib/          # 순수 함수: 거리 계산, 추천, 검색, 레이더 좌표, 테마
├── constants/    # 감성 지수 정의, 차트 설정, 화면 문구
├── types/        # Song, MoodProfile, 문구 타입
└── styles/       # 전역 토큰 · 다크모드 변수
data/             # 곡 데이터 (swems.json 등, 읽기 전용)
scripts/          # 검증 스크립트
docs/             # 작업 기록 (TypeScript 마이그레이션)
```

- 상태와 데이터 로딩은 `pages/`와 `hooks/`에서만 다루고, 화면 컴포넌트는 props만 받아 그립니다.
- 계산 로직은 `lib/`에 순수 함수로 분리해 두었습니다.

## 검증

```bash
npm run typecheck    # 타입 검사
npm run verify:lib   # 추천·검색·차트 계산 결과를 원본 알고리즘과 비교
```

- `scripts/compare-room.ts`는 원본 시안과 React 페이지의 화면을 요소별로 비교합니다. 원본 시안(`concepts/`, `js/`)은 git에 포함되어 있지 않아 로컬에서만 실행할 수 있습니다.

개발 규칙은 [`CLAUDE.md`](CLAUDE.md), TypeScript 전환 기록은 [`docs/typescript-migration.md`](docs/typescript-migration.md)에 있습니다.
