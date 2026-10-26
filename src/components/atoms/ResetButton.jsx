import "./ResetButton.css";

export default function ResetButton({ onClick, children }) {
  return (
    <button className="reset-button" type="button" onClick={onClick}>
      {children}
    </button>
  );
}
