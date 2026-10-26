import paperUrl from "/Final.pdf?url";
import type { HeroContent, ListenContent, MethodContent, NavItem, Segment, TuneContent, WhyContent } from "@/types/content";

// RichText 세그먼트: 문자열 | { em } | { b } | BR
export const BR: Segment = { br: true };

export const LINKS = {
  paper: paperUrl,
  home: "/",
  // 시안 갤러리(concepts/)는 개발 서버에서만 열린다.
  concepts: "/concepts/index.html",
} as const;

export const BRAND = { mark: "◒", text: "the feeling, in sound" } as const;

export const NAV_ITEMS: NavItem[] = [
  { href: "#why", label: "이야기" },
  { href: "#method", label: "연구 방법" },
  { href: "#tune", label: "감정 조절" },
  { href: "#listen", label: "곡 찾아보기" },
  { href: LINKS.paper, label: "연구 원문 ↗", external: true },
];

export const THEME_TOGGLE_TEXT = {
  light: { icon: "◐", label: "다크모드" },
  dark: { icon: "☼", label: "라이트모드" },
} as const;

export const HERO: HeroContent = {
  eyebrow: "A SWEMS LISTENING ROOM",
  volume: "VOL. 01",
  title: ["지금 마음과", BR, "닮은 노래를", BR, { em: "만나보세요." }],
  sub: ["곡의 감정을 읽고, 감정의 결이 닮은 음악으로", BR, "조용히 이어주는 작은 리스닝룸."],
  cta: { href: "#tune", label: "내 감정으로 노래 찾기", icon: "↓" },
  handNote: ["마음은 늘", BR, "여러 색으로", BR, "흐르니까요 ↗"],
  caption: "SIDE A — THE SHAPE OF A SONG",
};

export const WHY: WhyContent = {
  line: ["01 / WHY SWEMS", "음악은 기분을 닮아있으니까"],
  title: ["장르가 달라도", BR, "마음은 ", { em: "통할 수 있어요." }],
  paragraphs: [
    "좋아하는 가수나 장르를 지나, 지금 듣고 싶은 감정으로 곡을 골라본 적 있나요?",
    "SWEMS는 곡을 감정 형용사로 평가하고, 다섯 가지 감성 점수로 정리합니다. 그리고 감정의 모양이 가까운 곡들을 찾아 새로운 연결을 만듭니다.",
  ],
  feeling: { before: "한 곡의 감정은", words: ["달콤함", "온기", "열정", "세련됨", "그리움"], after: "으로 이어져요" },
};

export const METHOD: MethodContent = {
  line: ["02 / THE METHOD, IN DETAIL", "감정에서 추천까지, 논문의 네 단계"],
  title: ["감정을 모으고,", BR, "다섯 지수로 ", { em: "요약합니다." }],
  description: ["SWEMS는 곡 자체의 감성을 측정 가능한 패턴으로 바꾸기 위해", BR, "형용사 수집부터 유사도 계산까지 네 단계를 거칩니다."],
  index: ["RESEARCH", BR, "PIPELINE", BR, { b: "2018" }],
  steps: [
    {
      no: "01",
      tag: "COLLECT",
      title: ["음악을 표현하는", BR, "감정어를 모읍니다"],
      body: "선행 연구, SNS 키워드, 장르별 정성 인터뷰에서 형용사 134개를 수집했습니다. 비슷한 말은 대표 표현으로 묶고 60개를 최종 평가 항목으로 정리했습니다.",
      visual: { type: "words", items: ["설레는", "따뜻한", "그리운", "세련된", "… 60개"] },
    },
    {
      no: "02",
      tag: "RATE",
      title: ["전문가 패널이", BR, "곡의 감정을 평가합니다"],
      body: "논문은 100곡을 분석 대상으로 삼았습니다. 4명의 패널이 각 곡을 듣고 60개 형용사마다 1~7점으로 평가했으며, 응답을 평균해 곡별 점수로 만들었습니다.",
      visual: { type: "rating", label: "SONG", scale: [1, 2, 3, 4, 5, 6, 7] },
    },
    {
      no: "03",
      tag: "REDUCE",
      title: ["다섯 감성 지수로", BR, "패턴을 압축합니다"],
      body: "인기도와 유의한 관련이 확인된 26개 항목 중 공통성이 낮은 3개를 제외했습니다. 남은 23개에 주성분 분석과 Varimax 회전을 적용해 다섯 축을 정의했습니다.",
      visual: { type: "index", letters: ["S", "W", "E", "M", "S"] },
    },
    {
      no: "04",
      tag: "RECOMMEND",
      title: ["감정 거리가 가까운", BR, "곡을 찾습니다"],
      body: "각 곡을 다섯 지수의 좌표로 표현하고, 두 좌표 사이의 유클리드 거리를 계산합니다. 거리가 짧은 곡일수록 감성 패턴이 가깝다고 보고 추천합니다.",
      visual: { type: "distance", from: "A", to: "B", label: "d(A,B)" },
    },
  ],
  takeaway: {
    tag: "THE RESULT",
    text: ["장르나 아티스트가 달라도, ", { b: "다섯 감성 지수가 닮은 곡" }, "이라면 서로 연결될 수 있습니다."],
    link: "논문 원문 읽기 ↗",
  },
};

export const TUNE: TuneContent = {
  line: ["03 / TUNE YOUR FEELING", "다섯 지수로 감정 맞추기"],
  title: ["지금 듣고 싶은", BR, { em: "감정의 온도는?" }],
  description: "각 지수의 값을 옮겨보세요. 설정한 감정 패턴에 가까운 곡을 찾아드려요.",
  reset: "초기화 ↺",
  resultTag: "YOUR MOOD PROFILE",
  resultDescription: "다섯 지수를 종합해 가까운 패턴을 정렬했어요.",
  stamp: ["SWEMS", BR, "VECTOR"],
  note: "거리 계산은 다섯 지수를 함께 반영합니다. 값은 1~7점이며, 논문 샘플 10곡을 기준으로 가까운 순서대로 표시합니다.",
};

export const LISTEN: ListenContent = {
  line: ["04 / LISTEN & DISCOVER", "논문 속 열 곡의 감정 패턴"],
  title: ["어떤 곡의 마음이", BR, { em: "궁금한가요?" }],
  description: ["곡을 누르면 그 곡의 감성 모양과", BR, "가장 가까운 세 곡을 보여드려요."],
  libraryTitle: "THE SONG SHELF",
  searchPlaceholder: "곡 이름으로 찾아보기",
  libraryHint: "곡의 감정을 기준으로 가까운 음악을 연결합니다.",
  turntable: "ON THE TURNTABLE",
  emptyTitle: "곡을 선택해주세요",
  chartLabel: "선택한 곡의 감성 패턴",
  closeTitle: "감정의 결이 가까운 곡",
  closeHint: "거리 순으로 골랐어요",
  note: "※ 이 시안은 논문의 예시 10곡과 공개된 SWEMS 점수를 활용합니다.",
};

export const FOOTER = {
  caption: "감정의 결이 닮은 음악을 찾는 방법 · SWEMS",
  conceptsLink: "시안 후보 보기 ↑",
} as const;

export const MESSAGES = {
  loadError: "곡 데이터를 불러오지 못했습니다.",
  noResults: "검색 결과가 없습니다.",
} as const;
