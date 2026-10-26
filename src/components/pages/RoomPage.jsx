import songs from "@data/swems.json";

// 개발 환경 확인용 임시 페이지. 실제 화면은 컴포넌트를 만들면서 교체한다.
export default function RoomPage() {
  return (
    <main>
      <h1>SWEMS 감성 리스닝룸</h1>
      <p>Vite + React 개발 환경 준비 완료 · 곡 데이터 {songs.length}곡 로드</p>
    </main>
  );
}
