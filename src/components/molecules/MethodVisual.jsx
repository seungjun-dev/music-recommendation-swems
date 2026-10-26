import "./MethodVisual.css";

// 연구 단계별 작은 도식. visual.type: words | rating | index | distance
export default function MethodVisual({ visual }) {
  switch (visual.type) {
    case "words":
      return (
        <div className="method-visual words-visual">
          {visual.items.map((item) => <span key={item}>{item}</span>)}
        </div>
      );
    case "rating":
      return (
        <div className="method-visual rating-visual">
          <span>{visual.label}</span>
          {visual.scale.map((value) => <i key={value}>{value}</i>)}
        </div>
      );
    case "index":
      return (
        <div className="method-visual index-visual">
          {visual.letters.map((letter, index) => <b key={index}>{letter}</b>)}
        </div>
      );
    case "distance":
      return (
        <div className="method-visual distance-visual">
          <span>{visual.from}</span>
          <i></i>
          <b>{visual.label}</b>
          <i></i>
          <span>{visual.to}</span>
        </div>
      );
    default:
      return null;
  }
}
