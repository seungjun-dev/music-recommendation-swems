import { Fragment } from "react";
import "./FeelingLine.css";

interface FeelingLineProps {
  before: string;
  words: string[];
  after: string;
}

export default function FeelingLine({ before, words, after }: FeelingLineProps) {
  return (
    <div className="feeling-line">
      <span>{before}</span>
      {words.map((word) => (
        <Fragment key={word}>
          <i></i>
          <b>{word}</b>
        </Fragment>
      ))}
      <span>{after}</span>
    </div>
  );
}
