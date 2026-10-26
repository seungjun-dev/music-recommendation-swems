const axes = [
  { key: "sweet", label: "SWEET", color: "#ef9279" },
  { key: "warm", label: "WARM", color: "#c3aa52" },
  { key: "enthusiastic", label: "ENTHUSIASTIC", color: "#7c9b45" },
  { key: "modern", label: "MODERN", color: "#668da2" },
  { key: "sorrow", label: "SORROW", color: "#8d7aa1" },
];

const list = document.querySelector("#song-list");
const search = document.querySelector("#song-search");
const title = document.querySelector("#selected-title");
const artist = document.querySelector("#selected-artist");
const trackNo = document.querySelector("#selected-no");
const chart = document.querySelector("#radar-chart");
const recommendations = document.querySelector("#recommendations");
let songs = [];
let selectedId = null;

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

function distance(a, b) {
  return Math.sqrt(axes.reduce((sum, axis) => sum + (Number(a[axis.key]) - Number(b[axis.key])) ** 2, 0));
}

function renderList(query = "") {
  const needle = query.trim().toLocaleLowerCase("ko");
  const visibleSongs = songs.filter((song) => `${song.title} ${song.artist}`.toLocaleLowerCase("ko").includes(needle));
  list.innerHTML = visibleSongs.map((song) => `
    <button class="song-row${song.id === selectedId ? " active" : ""}" data-id="${song.id}" aria-pressed="${song.id === selectedId}">
      <span class="row-num">${String(song.id).padStart(2, "0")}</span>
      <span class="row-art" aria-hidden="true">${String(song.title).slice(0, 1)}</span>
      <span class="row-copy"><strong>${escapeHtml(song.title)}</strong><small>${escapeHtml(song.artist)}</small></span>
      <span class="row-arrow" aria-hidden="true">${song.id === selectedId ? "●" : "↗"}</span>
    </button>`).join("");
  list.querySelectorAll(".song-row").forEach((button) => button.addEventListener("click", () => selectSong(Number(button.dataset.id))));
  if (!visibleSongs.length) list.innerHTML = '<p class="empty-state">검색 결과가 없습니다.</p>';
}

function renderChart(song) {
  const cx = 180;
  const cy = 137;
  const radius = 91;
  const angles = axes.map((_, i) => (-Math.PI / 2) + (Math.PI * 2 * i) / axes.length);
  const point = (angle, r) => [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  const polygon = (scale) => angles.map((angle) => point(angle, radius * scale).map((n) => n.toFixed(1)).join(",")).join(" ");
  let svg = "";
  [0.25, 0.5, 0.75, 1].forEach((scale) => { svg += `<polygon class="chart-grid" points="${polygon(scale)}"/>`; });
  angles.forEach((angle) => {
    const [x, y] = point(angle, radius);
    svg += `<line class="chart-axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`;
  });
  const valuePoints = axes.map((axis, i) => point(angles[i], radius * Math.max(0, Math.min(1, Number(song[axis.key]) / 7))));
  svg += `<polygon class="chart-area" points="${valuePoints.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")}"/>`;
  valuePoints.forEach(([x, y], i) => { svg += `<circle class="chart-point" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" style="fill:${axes[i].color}"/>`; });
  angles.forEach((angle, i) => {
    const [x, y] = point(angle, radius + 26);
    const anchor = x < cx - 6 ? "end" : x > cx + 6 ? "start" : "middle";
    svg += `<text class="chart-text" x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle">${axes[i].label}</text>`;
  });
  chart.innerHTML = svg;
  chart.setAttribute("aria-label", `${song.title}의 감성 지수: ${axes.map((axis) => `${axis.label} ${Number(song[axis.key]).toFixed(1)}`).join(", ")}`);
}

function renderRecommendations(song) {
  const nearest = songs.filter((item) => item.id !== song.id)
    .map((item) => ({ ...item, distance: distance(song, item) }))
    .sort((a, b) => a.distance - b.distance).slice(0, 3);
  recommendations.innerHTML = nearest.map((item, index) => `
    <button class="recommendation" data-id="${item.id}" aria-label="${escapeHtml(item.title)} 선택, 거리 ${item.distance.toFixed(2)}">
      <span class="rec-rank">0${index + 1}</span>
      <span><span class="rec-title">${escapeHtml(item.title)}</span><span class="rec-artist">${escapeHtml(item.artist)}</span></span>
      <span class="rec-distance"><b>${item.distance.toFixed(2)}</b>거리</span>
    </button>`).join("");
  recommendations.querySelectorAll(".recommendation").forEach((button) => button.addEventListener("click", () => selectSong(Number(button.dataset.id))));
}

function selectSong(id) {
  const song = songs.find((item) => item.id === id);
  if (!song) return;
  selectedId = song.id;
  title.textContent = song.title;
  artist.textContent = song.artist;
  trackNo.textContent = `NO. ${String(song.id).padStart(2, "0")}`;
  renderChart(song);
  renderRecommendations(song);
  renderList(search.value);
}

search.addEventListener("input", () => renderList(search.value));
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    search.focus();
  }
});

fetch(new URL("../data/swems.json", import.meta.url))
  .then((response) => {
    if (!response.ok) throw new Error("곡 데이터 파일을 불러오지 못했습니다.");
    return response.json();
  })
  .then((data) => {
    songs = data;
    document.querySelector(".demo-count").textContent = `${String(songs.length).padStart(2, "0")} TRACKS`;
    renderList();
    if (songs.length) selectSong(songs[0].id);
  })
  .catch(() => {
    list.innerHTML = '<p class="empty-state">곡 데이터를 불러오지 못했습니다.<br>로컬 웹 서버에서 열어주세요.</p>';
  });
