import { Fragment } from "react";

// 세그먼트 배열을 렌더링한다: 문자열 | { em } | { b } | { br: true }
export default function RichText({ segments }) {
  return segments.map((segment, index) => {
    if (typeof segment === "string") return <Fragment key={index}>{segment}</Fragment>;
    if (segment.br) return <br key={index} />;
    if (segment.em) return <em key={index}>{segment.em}</em>;
    if (segment.b) return <b key={index}>{segment.b}</b>;
    return null;
  });
}
