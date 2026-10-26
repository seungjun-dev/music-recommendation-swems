import "./TrackInfo.css";

export default function TrackInfo({ caption, title, artist, number }) {
  return (
    <div className="listen-track">
      <div className="sleeve">♫</div>
      <div>
        <small>{caption}</small>
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
      <span>{number}</span>
    </div>
  );
}
