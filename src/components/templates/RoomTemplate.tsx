import type { ReactNode } from "react";

interface RoomTemplateProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

// 헤더 · 본문 · 푸터 골격
export default function RoomTemplate({ header, footer, children }: RoomTemplateProps) {
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
