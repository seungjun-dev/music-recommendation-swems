# CLAUDE.md

이 문서는 `concepts/room.html`(SWEMS 감성 리스닝룸) 페이지를 React로 재구현할 때 따르는 개발 규칙이다.

## 프로젝트 개요

- SWEMS: 곡의 감정을 다섯 지수(Sweet, Warm, Enthusiastic, Modern, Sorrow, 각 1~7점)로 표현하고, 유클리드 거리가 가까운 곡을 추천하는 알고리즘의 데모 페이지.
- 원본 시안: `concepts/room.html` + `concepts/room.css` + `concepts/room-enhancements.css` + `concepts/room-controls.js` + `js/swems.js`
- 목표: 원본 시안의 화면과 동작을 그대로 유지하면서 React 컴포넌트 구조로 옮긴다. 기존 정적 파일(`concepts/`, `js/`, `css/`)은 참고용으로 두고 수정하지 않는다. (예전 루트 `index.html` 정적 페이지는 삭제하고 Vite 진입점으로 교체했다.)

## 기술 스택

1. **빌드**: Vite
2. **UI**: React (함수형 컴포넌트 + Hooks)
3. 새 라이브러리 추가는 꼭 필요한 경우에만 하고, 추가 시 이유를 함께 남긴다.

저장소 루트가 Vite 프로젝트 루트다. 진입점은 `index.html` → `src/main.jsx` → `src/components/pages/RoomPage.jsx`.

- `vite.config.js` alias: `@` → `src/`, `@data` → `data/`
- 개발 서버: `http://localhost:5173` (`.claude/launch.json`의 `vite-dev`)
- 빌드 결과물 `dist/`는 git에서 제외한다.

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 확인
```

## 데이터 규칙 (`data/`)

- **`data/` 디렉토리는 읽기 전용이다.** 파일을 수정, 이동, 이름 변경, 삭제하지 않고 새 파일도 만들지 않는다.
- 앱은 `data/swems.json`을 읽어서 사용한다. 데이터를 가공해야 하면 메모리 안에서만 처리한다(원본 덮어쓰기, `data/` 안에 결과 저장 금지).
- 데이터를 `public/` 등 다른 곳으로 복사해 사본을 만들지 않는다. alias `@data`로 원본을 직접 import한다 (예: `import songs from "@data/swems.json"`).
- `swems.json` 레코드 형태:

```json
{ "id": 1, "title": "…", "artist": "…", "sweet": 2.755, "warm": 2.6375,
  "enthusiastic": 2.7225, "modern": 2.71, "sorrow": 3.925, "score": 14.75 }
```

## 아키텍처: Atomic Design

모든 소스는 컴포넌트화와 모듈화를 전제로 작성한다. UI는 Atomic 계층으로, UI가 아닌 로직은 별도 모듈로 나눈다.

```
src/
├── components/
│   ├── atoms/        # 더 쪼갤 수 없는 최소 단위 (Button, Eyebrow, MoodDot, RangeInput, SearchInput …)
│   ├── molecules/    # atom 조합 (MoodSlider, SongListItem, MoodResultItem, MethodStep, SectionLine …)
│   ├── organisms/    # 독립적인 화면 영역 (Header, Hero, WhySection, MethodSection, TuneSection, ListenSection, RadarChart, Footer …)
│   ├── templates/    # 페이지 레이아웃 골격 (RoomTemplate)
│   └── pages/        # 데이터와 상태를 연결하는 최상위 (RoomPage)
├── hooks/            # 커스텀 훅 (useSongs, useTheme, useMoodProfile …)
├── lib/              # 순수 함수 (distance, rankByProfile, nearestSongs, escape 등)
├── constants/        # 감성 지수 정의, 기본값, 슬라이더 범위 등
└── styles/           # 전역 토큰, 테마 변수
```

### 계층 규칙

- 하위 계층은 상위 계층을 import하지 않는다 (atom → molecule → organism → template → page 방향만 허용).
- atom과 molecule은 props만 받아 렌더링하는 표현 컴포넌트로 만든다. 데이터 fetch, 전역 상태, side effect는 넣지 않는다.
- 상태와 데이터 로딩은 `pages/`와 `hooks/`에서 처리하고 props로 내려준다.
- 거리 계산, 정렬 같은 비즈니스 로직은 `lib/`에 순수 함수로 두고 컴포넌트에서 직접 구현하지 않는다.
- 컴포넌트 하나에 파일 하나를 두고, 스타일은 컴포넌트 옆에 함께 둔다 (CSS Modules 권장).
- 매직 넘버(1, 7, 0.1, 4.0 등)와 지수 목록은 `constants/`에 모아 정의한다.
- 원본의 `innerHTML` + 수동 escape 방식은 쓰지 않고 JSX 렌더링을 사용한다.

## 원본 동작 명세 (재현 기준)

| 영역 | 동작 |
| --- | --- |
| Header | 섹션 앵커 내비게이션, 논문 PDF 링크(`Final.pdf`), 다크모드 토글 |
| 테마 | `body.dark-mode` 토글, `localStorage` 키 `swems-room-theme` 저장 (try/catch), `?theme=dark/light` 쿼리 우선, `meta[name=theme-color]`를 `#252c29`/`#f4e9df`로 변경 |
| Hero / Why / Method | 정적 콘텐츠 (문구는 원본과 동일하게 유지) |
| Tune (감정 조절) | 5개 슬라이더 (min 1, max 7, step 0.1, 기본 4.0), 값은 소수 1자리로 표시, `--range-progress` CSS 변수 갱신, 프로필과의 유클리드 거리 상위 **4곡** 표시, 초기화 버튼은 전부 4.0으로 되돌림 |
| Tune 결과 클릭 | 검색어 초기화 → 해당 곡 선택 → `#listen` 섹션으로 부드럽게 스크롤 |
| Listen (곡 찾아보기) | 곡 목록 + 제목 검색, 곡 선택 시 제목/아티스트/번호 표시, 다섯 지수 레이더 차트(SVG, viewBox 360×300), 가장 가까운 **3곡** 추천 |
| 데이터 로딩 실패 | "곡 데이터를 불러오지 못했습니다." 메시지 표시 |

거리 공식: `d(A, B) = √Σ (A[k] − B[k])²`, k ∈ {sweet, warm, enthusiastic, modern, sorrow}

## 개발 프로세스: 기능마다 검증과 영향도 분석

기능 하나(컴포넌트, 훅, 유틸)를 만들 때마다 다음 단계를 거친 뒤 다음 기능으로 넘어간다.

1. **구현**: 위 계층 규칙에 맞는 위치에 작성한다.
2. **검증**
   - `npm run build`가 오류 없이 통과하는지 확인한다.
   - 개발 서버에서 실제로 렌더링하고 원본 `concepts/room.html`과 화면 및 동작을 비교한다 (라이트/다크 모드, 모바일 폭 포함).
   - `lib/`의 순수 함수는 입력/출력 예시로 결과를 확인한다 (예: 원본과 같은 프로필에서 같은 추천 순서와 거리가 나오는지).
   - 콘솔 에러와 경고가 없는지 확인한다.
3. **영향도 분석**: 변경 후 아래 내용을 정리해 보고한다.
   - 변경/추가된 파일 목록
   - 이 변경을 사용하는(import하는) 컴포넌트와 모듈
   - props, 훅 반환값, 상수 등 공유 인터페이스가 바뀌었는지와 그 영향 범위
   - 다시 확인해야 하는 화면과 기능
   - `data/` 파일을 건드리지 않았는지 확인 (`git status data/`에 변경이 없어야 함)
4. 검증에 실패한 항목이나 확인하지 못한 항목은 숨기지 않고 그대로 보고한다.

## 금지 사항

- `data/` 안의 파일 편집, 삭제, 생성
- 기존 정적 시안 파일(`concepts/`, `js/`, `css/`) 수정
- 계층 역방향 import, 표현 컴포넌트 안의 데이터 fetch
- 검증 및 영향도 분석 없이 여러 기능을 한 번에 구현하기
