# TypeScript 마이그레이션 기록

- 날짜: 2026-10-27
- 기준 커밋: `77c2b7a feat: room.html 리스닝룸을 React 컴포넌트로 변환`
- 범위: React 앱(`src/`), 빌드 설정(`vite.config`), 검증 스크립트(`scripts/`)의 JavaScript 전부
- 범위 밖: 원본 시안(`concepts/`, `js/`, `css/`)과 `pilot/`의 Python 코드. CLAUDE.md 규칙에 따라 수정하지 않았다.

## 1. 추가한 패키지

| 패키지 | 버전 | 이유 |
| --- | --- | --- |
| `typescript` | ^7.0.2 | 타입 검사 (`tsc -b`). 트랜스파일은 Vite가 하고 tsc는 검사만 한다 (`noEmit`). |
| `@types/react`, `@types/react-dom` | ^19.3.0 | React 19 타입 |
| `@types/node` | ^22.20.5 | `vite.config.ts`, `scripts/verify-lib.ts`용. 로컬 Node 버전(v22)에 맞춰 22.x로 고정했다. |

## 2. 설정 파일

| 파일 | 내용 |
| --- | --- |
| `tsconfig.json` | 두 프로젝트를 묶는 루트 (`references`) |
| `tsconfig.app.json` | 브라우저 코드: `src/`, `scripts/compare-room.ts`. DOM 타입, `jsx: react-jsx`, `types: ["vite/client"]`(`?url`, `.css` import 타입), alias `@/*`, `@data/*` |
| `tsconfig.node.json` | Node 코드: `vite.config.ts`, `scripts/verify-lib.ts`. `types: ["node"]` |

두 설정 모두 공통으로 아래 옵션을 켰다.

- `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- `allowImportingTsExtensions`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `isolatedModules`
  - `src/lib`과 `src/constants`(content.ts 제외)를 Node의 `--experimental-strip-types`로 바로 실행하기 위해서다. 그래서 이 폴더들은 `../constants/mood.ts`처럼 확장자까지 쓴 상대 경로로 import하고, 타입은 `import type`으로만 가져온다. enum, namespace, 생성자 매개변수 속성처럼 지울 수 없는 문법은 쓸 수 없다.
- `noUncheckedIndexedAccess`는 켜지 않았다. 레이더 축 배열처럼 길이가 고정된 배열 접근마다 검사 코드가 들어가는데, 얻는 이득이 적어서다.

## 3. `package.json` 스크립트

| 스크립트 | 이전 | 이후 |
| --- | --- | --- |
| `build` | `vite build` | `tsc -b && vite build` (타입 오류가 있으면 빌드 실패) |
| `typecheck` | 없음 | `tsc -b` |
| `verify:lib` | `node scripts/verify-lib.mjs "$PWD"` (직접 실행) | `node --experimental-strip-types … scripts/verify-lib.ts` |

## 4. 파일 변경

확장자 변경은 `git mv`로 해서 이력이 이어진다.

| 이전 | 이후 | 개수 |
| --- | --- | --- |
| `src/**/*.jsx` | `*.tsx` | 34 (components 33 + `main`) |
| `src/**/*.js` | `*.ts` | 14 (constants 4, hooks 4, lib 6) |
| `vite.config.js` | `vite.config.ts` | 1 (내용 그대로) |
| `scripts/verify-lib.mjs` | `scripts/verify-lib.ts` | 1 |
| `scripts/compare-room.js` | `scripts/compare-room.ts` | 1 |

새로 만든 파일:

- `src/types/song.ts`: `MoodKey`, `MoodProfile`, `Song`, `Ranked<T>`, `RankedSong`, `MoodAxis`, `MoodRange`
- `src/types/content.ts`: `Segment`(RichText), `NavItem`, `MethodVisualSpec`, `MethodStepContent`, 섹션별 문구 타입 (`HeroContent`, `WhyContent`, `MethodContent`, `TuneContent`, `ListenContent`)
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- 이 문서

## 5. 코드 변경 상세

화면 출력과 동작은 바꾸지 않았다. 타입을 붙이면서 생긴 변경은 아래와 같다.

### types / constants

- `MOOD_AXES`는 `readonly MoodAxis[]`, `MOOD_KEYS`는 `readonly MoodKey[]`로 타입을 정했다.
- `RADAR`에 `RadarConfig` 인터페이스를 붙였다.
- `content.ts`의 섹션 문구에 `HeroContent` 같은 인터페이스를 붙였다. `METHOD.steps[].visual.type`이 `"words" | "rating" | …` 리터럴로 검사되므로, 오타가 나면 컴파일 오류가 난다.
- 바뀌지 않는 객체(`LINKS`, `BRAND`, `THEME_TOGGLE_TEXT`, `FOOTER`, `MESSAGES`, `THEME_COLORS`)는 `as const`로 바꿨다.

### lib

- `rankByDistance`, `matchProfile`, `nearestSongs`를 제네릭(`<T extends Song>`)으로 바꿨다. 결과 타입은 `Ranked<T>[]`(곡 + `distance`)다.
- `searchSongs`는 `title`, `artist`만 있으면 되는 제네릭으로 바꿨다.
- `radarGeometry`에 반환 타입 `RadarGeometry`를 정의했다. `anchor`는 `"start" | "middle" | "end"`다.
- `resolveInitialDark`, `saveTheme`는 `Storage` 전체가 아니라 `Pick<Storage, "getItem">`/`Pick<Storage, "setItem">`만 받는다. 검증 스크립트에서 가짜 객체를 넘길 수 있게 하기 위해서다.

### hooks

- `useSongs`: `SongsState`(`songs: Song[]`, `status: "loading" | "ready" | "error"`)를 반환하도록 타입을 정했다. `.then(…)` 안에서 `active && setState(…)`처럼 쓰던 단축 평가를 `if`문으로 바꿨다 (동작은 같다).
- `useMoodProfile`: `setValue(key: MoodKey, value: number)`로 지수 키를 제한했다.
- `useFocusShortcut`: `RefObject<HTMLElement | null>`과 `KeyboardEvent` 타입을 붙였다.
- `useTheme`: 반환 타입 `{ isDark, toggle }`을 명시했다.

### components

- 모든 컴포넌트에 props 인터페이스를 붙였다. 다른 파일에서 쓰는 것은 export했다 (`SongLibraryProps`, `ListenPanelProps`는 `ListenSection`이 사용).
- `RichText`: `segment.br` 같은 속성 검사를 `"br" in segment`로 바꿨다. 타입이 좁혀져서 마지막 `return null`이 필요 없어졌다.
- `MethodVisual`: `switch`가 모든 `type`을 다루는 것이 타입으로 확인되므로 `default: return null`을 지웠다.
- `MoodSlider`: CSS 변수 `--range-progress`를 넘기기 위해 `ProgressStyle` 타입(`CSSProperties & { "--range-progress": string }`)을 만들었다.
- `SearchField`, `ListenSection`: React 19 방식대로 `ref`를 일반 prop으로 받고, 타입은 `Ref<HTMLInputElement>`, `Ref<HTMLElement>`로 정했다.
- `RoomPage`: `useState<number | null>`, `useRef<HTMLElement>`, `useRef<HTMLInputElement>`로 타입을 지정했다.
- `main.tsx`: `#root`가 없으면 오류를 던지도록 null 검사를 추가했다.

### scripts

- `verify-lib.ts`: 예전에는 실행할 때 저장소 경로를 인수로 넘기고 동적 import를 했다. 이제는 `../src/lib/*.ts`를 정적으로 import한다. 검사 결과가 하나라도 틀리면 종료 코드 1을 돌려준다.
- `compare-room.ts`: 예전에는 콘솔에 코드를 붙여넣어 실행했다. 이제는 Vite 개발 서버가 TS를 바로 변환해 주므로, 콘솔에서 `const { compareRoom } = await import("/scripts/compare-room.ts")`로 불러 쓴다. 함수 내부를 `load`, `snapshot`, `diff`로 나누고 결과 타입(`CompareResult`)을 정의했다.

## 6. 검증 결과 (마이그레이션 후)

| 항목 | 결과 |
| --- | --- |
| `npm run typecheck` | 오류 0. app 50개, node 11개 파일 검사. 일부러 타입 오류를 넣으면 잡히는 것도 확인했다. |
| `npm run build` | 통과. CSS 번들 해시(`index-Duglg7wC.css`)가 마이그레이션 전과 같다. |
| `npm run verify:lib` | `checks=2482 fails=0` (감정 프로필 2,000개, 117곡 추천과 레이더 좌표, 검색 8건, 테마 5건) |
| 화면 비교 (`compareRoom`) | 1280/768/375/1600px × light/dark 8개 조합 모두 요소 1,125개가 원본과 같다. 의도적으로 바꾼 링크 `href` 5건만 다르다. |
| 동작 비교 | 슬라이더, 검색, 검색 결과 없음, 곡 선택, 추천 클릭, 초기화, 테마 토글, 감정 결과 클릭 8개 시나리오 모두 차이 0 |
| 실제 페이지 확인 | 슬라이더 값을 바꾸면 결과가 바뀐다. 곡 선택, ⌘K 검색 포커스, 초기화가 동작한다. 콘솔 에러 없음. |
| `data/`, `concepts/`, `js/`, `css/` | 변경 없음 |
| 남은 JS 파일 | 앱 소스와 스크립트에는 없다 (원본 시안 폴더 제외) |

확인하지 못한 것: 데이터 로딩 실패 화면. fetch 실패를 브라우저에서 재현하지 않았다. 이 부분의 코드는 타입 추가 외에 바뀌지 않았다.
