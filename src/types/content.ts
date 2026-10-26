// RichText 세그먼트: 문자열 | { em } | { b } | BR
export type Segment = string | { em: string } | { b: string } | { br: true };

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export type MethodVisualSpec =
  | { type: "words"; items: string[] }
  | { type: "rating"; label: string; scale: number[] }
  | { type: "index"; letters: string[] }
  | { type: "distance"; from: string; to: string; label: string };

export interface MethodStepContent {
  no: string;
  tag: string;
  title: Segment[];
  body: string;
  visual: MethodVisualSpec;
}

// 섹션 머리줄 [왼쪽, 오른쪽]
export type SectionLineText = [string, string];

export interface HeroContent {
  eyebrow: string;
  volume: string;
  title: Segment[];
  sub: Segment[];
  cta: { href: string; label: string; icon: string };
  handNote: Segment[];
  caption: string;
}

export interface WhyContent {
  line: SectionLineText;
  title: Segment[];
  paragraphs: string[];
  feeling: { before: string; words: string[]; after: string };
}

export interface MethodContent {
  line: SectionLineText;
  title: Segment[];
  description: Segment[];
  index: Segment[];
  steps: MethodStepContent[];
  takeaway: { tag: string; text: Segment[]; link: string };
}

export interface TuneContent {
  line: SectionLineText;
  title: Segment[];
  description: string;
  reset: string;
  resultTag: string;
  resultDescription: string;
  stamp: Segment[];
  note: string;
}

export interface ListenContent {
  line: SectionLineText;
  title: Segment[];
  description: Segment[];
  libraryTitle: string;
  searchPlaceholder: string;
  libraryHint: string;
  turntable: string;
  emptyTitle: string;
  chartLabel: string;
  closeTitle: string;
  closeHint: string;
  note: string;
}
