import { Fragment } from "react";
import type { Segment } from "@/types/content";

// 세그먼트 배열을 렌더링한다: 문자열 | { em } | { b } | { br: true }
interface RichTextProps {
  segments: readonly Segment[];
}

export default function RichText({ segments }: RichTextProps) {
  return segments.map((segment, index) => {
    if (typeof segment === "string") return <Fragment key={index}>{segment}</Fragment>;
    if ("br" in segment) return <br key={index} />;
    if ("em" in segment) return <em key={index}>{segment.em}</em>;
    return <b key={index}>{segment.b}</b>;
  });
}
