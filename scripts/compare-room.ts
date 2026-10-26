// 사용법: 개발 서버의 React 페이지(/) 콘솔에서
//   const { compareRoom } = await import("/scripts/compare-room.ts");
//   await compareRoom(1280, "light");
// 원본(/concepts/room.html)과 React 페이지를 같은 크기 iframe 에 띄워 요소별 계산 스타일/레이아웃/텍스트/속성을 비교한다.

type Theme = "light" | "dark";
type Action = (win: Window) => void;

interface ElementSnapshot {
  sig: string;
  text: string;
  attrs: string;
  box: string;
  style: Record<string, string>;
  pseudo: string;
}

export interface CompareDiff {
  i: number;
  el?: string;
  missing?: string;
  sig?: [string, string];
  text?: [string, string];
  attrs?: [string, string];
  box?: [string, string];
  pseudo?: [string, string];
  style?: Record<string, [string, string]>;
}

export interface CompareResult {
  width: number;
  theme: Theme;
  counts: [number, number];
  meta: Record<string, string | number>;
  diffCount: number;
  diffs: CompareDiff[];
}

const PROPS = ["font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing", "color",
  "background-color", "background-image", "padding", "margin", "border-top", "border-right", "border-bottom", "border-left",
  "display", "gap", "grid-template-columns", "position", "box-shadow", "flex-wrap", "text-align", "white-space",
  "writing-mode", "transform", "fill", "stroke", "opacity", "float", "overflow"];
const ATTRS = ["aria-label", "aria-pressed", "points", "cx", "cy", "x", "y", "x1", "y1", "x2", "y2", "text-anchor", "href", "target", "placeholder"];
const SETTLE_MS = 1500;
const ACTION_MS = 600;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function load(src: string, width: number): Promise<HTMLIFrameElement> {
  return new Promise((resolve) => {
    const frame = document.createElement("iframe");
    frame.style.cssText = `position:absolute;left:-99999px;top:0;width:${width}px;height:900px;border:0`;
    frame.onload = () => setTimeout(() => resolve(frame), SETTLE_MS);
    frame.src = src;
    document.body.appendChild(frame);
  });
}

function snapshot(win: Window): ElementSnapshot[] {
  const els = [...win.document.body.querySelectorAll("*")].filter((el) => !["SCRIPT", "STYLE", "LINK"].includes(el.tagName) && el.id !== "root");
  return els.map((el) => {
    const cs = win.getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const own = [...el.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join("").replace(/\s+/g, " ").trim();
    return {
      sig: `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").trim().split(/\s+/).join(".")}`,
      text: own.slice(0, 40),
      attrs: ATTRS.map((a) => (el.hasAttribute(a) ? `${a}=${el.getAttribute(a)}` : null)).filter(Boolean).join(" "),
      box: [r.x, r.y, r.width, r.height].map((n) => Math.round(n)).join(","),
      style: Object.fromEntries(PROPS.map((p) => [p, cs.getPropertyValue(p)])),
      pseudo: el.classList.contains("label") ? win.getComputedStyle(el, "::after").getPropertyValue("top") : "",
    };
  });
}

function diff(a: ElementSnapshot[], b: ElementSnapshot[], limit = 25): CompareDiff[] {
  const diffs: CompareDiff[] = [];
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n && diffs.length < limit; i++) {
    const x = a[i];
    const y = b[i];
    if (!x || !y) {
      diffs.push({ i, missing: x ? `next ends; orig ${x.sig}` : `orig ends; next ${y?.sig}` });
      break;
    }
    const d: CompareDiff = { i, el: x.sig };
    let changed = false;
    for (const key of ["sig", "text", "attrs", "box", "pseudo"] as const) {
      if (x[key] !== y[key]) {
        d[key] = [x[key], y[key]];
        changed = true;
      }
    }
    for (const p of PROPS) {
      if (x.style[p] !== y.style[p]) {
        (d.style ??= {})[p] = [x.style[p], y.style[p]];
        changed = true;
      }
    }
    if (changed) diffs.push(d);
  }
  return diffs;
}

export async function compareRoom(width = 1280, theme: Theme = "light", action: Action | null = null): Promise<CompareResult> {
  const [orig, next] = await Promise.all([load(`/concepts/room.html?theme=${theme}`, width), load(`/?theme=${theme}`, width)]);
  const origWin = orig.contentWindow!;
  const nextWin = next.contentWindow!;
  if (action) {
    action(origWin);
    action(nextWin);
    await wait(ACTION_MS);
  }
  const a = snapshot(origWin);
  const b = snapshot(nextWin);
  const themeColor = (win: Window) => win.document.querySelector('meta[name="theme-color"]')?.getAttribute("content") ?? "";
  const meta = {
    origTheme: themeColor(origWin), nextTheme: themeColor(nextWin),
    origBody: origWin.document.body.className, nextBody: nextWin.document.body.className,
    origHeight: origWin.document.documentElement.scrollHeight, nextHeight: nextWin.document.documentElement.scrollHeight,
  };
  const diffs = diff(a, b);
  orig.remove();
  next.remove();
  return { width, theme, counts: [a.length, b.length], meta, diffCount: diffs.length, diffs };
}
