import "./HeroStill.css";

// 히어로 오른쪽의 레코드 일러스트
export default function HeroStill({ caption }) {
  return (
    <div className="hero-still">
      <div className="sun"></div>
      <div className="record">
        <div className="groove g1"></div>
        <div className="groove g2"></div>
        <div className="groove g3"></div>
        <div className="label"></div>
      </div>
      <div className="flower flower1">✳</div>
      <div className="flower flower2">✿</div>
      <span className="still-caption">{caption}</span>
    </div>
  );
}
