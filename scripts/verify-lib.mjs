// 사용법: node scripts/verify-lib.mjs "$PWD" — src/lib 결과를 원본 room-controls.js / swems.js 로직과 비교한다.
import { readFileSync } from "node:fs";
const root = process.argv[2];
const { matchProfile, nearestSongs } = await import(`${root}/src/lib/recommend.js`);
const { searchSongs } = await import(`${root}/src/lib/search.js`);
const { radarGeometry } = await import(`${root}/src/lib/radar.js`);
const { resolveInitialDark } = await import(`${root}/src/lib/theme.js`);
const songs = JSON.parse(readFileSync(`${root}/data/swems.json`, "utf8"));
const dims = ["sweet", "warm", "enthusiastic", "modern", "sorrow"];

// --- 원본 room-controls.js / swems.js 로직 그대로 ---
const origMood = (profile) => songs.map((s) => ({ ...s, distance: Math.sqrt(dims.reduce((sum, k) => sum + (Number(s[k]) - profile[k]) ** 2, 0)) }))
  .sort((a, b) => a.distance - b.distance).slice(0, 4);
const origDist = (a, b) => Math.sqrt(dims.reduce((sum, k) => sum + (Number(a[k]) - Number(b[k])) ** 2, 0));
const origNear = (song) => songs.filter((i) => i.id !== song.id).map((i) => ({ ...i, distance: origDist(song, i) }))
  .sort((a, b) => a.distance - b.distance).slice(0, 3);
const origSearch = (q) => { const n = q.trim().toLocaleLowerCase("ko"); return songs.filter((s) => `${s.title} ${s.artist}`.toLocaleLowerCase("ko").includes(n)); };
function origChart(song) {
  const cx = 180, cy = 137, radius = 91;
  const axes = ["SWEET","WARM","ENTHUSIASTIC","MODERN","SORROW"];
  const angles = dims.map((_, i) => (-Math.PI / 2) + (Math.PI * 2 * i) / 5);
  const point = (a, r) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  const polygon = (s) => angles.map((a) => point(a, radius * s).map((n) => n.toFixed(1)).join(",")).join(" ");
  const vp = dims.map((k, i) => point(angles[i], radius * Math.max(0, Math.min(1, Number(song[k]) / 7))));
  return { grid: [0.25,0.5,0.75,1].map(polygon), area: vp.map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
    labels: angles.map((a, i) => { const [x, y] = point(a, radius + 26); return [x.toFixed(1), y.toFixed(1), x < cx - 6 ? "end" : x > cx + 6 ? "start" : "middle", axes[i]]; }) };
}
// ---

let checks = 0, fails = 0;
const eq = (name, a, b) => { checks++; if (JSON.stringify(a) !== JSON.stringify(b)) { fails++; if (fails < 5) console.log("FAIL", name, JSON.stringify(a).slice(0, 200), JSON.stringify(b).slice(0, 200)); } };
const ids = (list) => list.map((s) => [s.id, s.distance.toFixed(10)]);

const def = Object.fromEntries(dims.map((k) => [k, 4]));
eq("mood default", ids(matchProfile(songs, def, 4)), ids(origMood(def)));
let seed = 42; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (let i = 0; i < 2000; i++) {
  const p = Object.fromEntries(dims.map((k) => [k, Math.round((1 + rnd() * 6) * 10) / 10]));
  eq("mood random", ids(matchProfile(songs, p, 4)), ids(origMood(p)));
}
for (const s of songs) {
  eq(`near ${s.id}`, ids(nearestSongs(songs, s, 3)), ids(origNear(s)));
  const g = radarGeometry(s), o = origChart(s);
  eq(`radar grid ${s.id}`, g.grid, o.grid);
  eq(`radar area ${s.id}`, g.values.area, o.area);
  eq(`radar labels ${s.id}`, g.labels.map((l) => [l.x, l.y, l.anchor, l.text]), o.labels);
}
for (const q of ["", "  ", "빅뱅", "BAE", "bae", " 혁오 ", "zzz없음", "feat"]) eq(`search "${q}"`, searchSongs(songs, q).map((s) => s.id), origSearch(q).map((s) => s.id));

const store = (v) => ({ getItem: () => v });
eq("theme ?dark", resolveInitialDark("?theme=dark", store("light")), true);
eq("theme ?light", resolveInitialDark("?theme=light", store("dark")), false);
eq("theme stored", resolveInitialDark("", store("dark")), true);
eq("theme none", resolveInitialDark("", store(null)), false);
eq("theme throws", resolveInitialDark("", { getItem: () => { throw new Error("blocked"); } }), false);

console.log(`songs=${songs.length} checks=${checks} fails=${fails}`);
console.log("default profile top4:", matchProfile(songs, def, 4).map((s) => `${s.id}:${s.title}(${s.distance.toFixed(2)})`).join(" | "));
