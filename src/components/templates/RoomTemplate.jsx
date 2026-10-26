// 헤더 · 본문 · 푸터 골격
export default function RoomTemplate({ header, footer, children }) {
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
