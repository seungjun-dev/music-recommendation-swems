// 사용법: compareRoom(width, theme) — 원본과 React 페이지를 같은 크기 iframe 에 띄워 요소별 계산 스타일/레이아웃을 비교
window.compareRoom = async function compareRoom(width = 1280, theme = "light", actions = null) {
  const PROPS = ["font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing", "color",
    "background-color", "background-image", "padding", "margin", "border-top", "border-right", "border-bottom", "border-left",
    "display", "gap", "grid-template-columns", "position", "box-shadow", "flex-wrap", "text-align", "white-space",
    "writing-mode", "transform", "fill", "stroke", "opacity", "float", "overflow"];
  const load = (src) => new Promise((resolve) => {
    const frame = document.createElement("iframe");
    frame.style.cssText = `position:absolute;left:-99999px;top:0;width:${width}px;height:900px;border:0`;
    frame.onload = () => setTimeout(() => resolve(frame), 1500);
    frame.src = src;
    document.body.appendChild(frame);
  });
  const [orig, next] = await Promise.all([load(`/concepts/room.html?theme=${theme}`), load(`/?theme=${theme}`)]);
  if (actions) { actions(orig.contentWindow); actions(next.contentWindow); await new Promise((r) => setTimeout(r, 600)); }
  const snapshot = (win) => {
    const doc = win.document;
    const els = [...doc.body.querySelectorAll("*")].filter((el) => !["SCRIPT", "STYLE", "LINK"].includes(el.tagName) && el.id !== "root");
    return els.map((el) => {
      const cs = win.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").replace(/\s+/g, " ").trim();
      const attrs = ["aria-label", "aria-pressed", "points", "cx", "cy", "x", "y", "x1", "y1", "x2", "y2", "text-anchor", "href", "target", "placeholder"]
        .map((a) => el.hasAttribute(a) ? `${a}=${el.getAttribute(a)}` : null).filter(Boolean).join(" ");
      return {
        sig: `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").trim().split(/\s+/).join(".")}`,
        text: own.slice(0, 40),
        attrs,
        box: [r.x, r.y, r.width, r.height].map((n) => Math.round(n)).join(","),
        style: Object.fromEntries(PROPS.map((p) => [p, cs.getPropertyValue(p)])),
        pseudo: el.classList.contains("label") ? win.getComputedStyle(el, "::after").getPropertyValue("top") : "",
      };
    });
  };
  const a = snapshot(orig.contentWindow), b = snapshot(next.contentWindow);
  const meta = { origTheme: orig.contentDocument.querySelector('meta[name="theme-color"]').content, nextTheme: next.contentDocument.querySelector('meta[name="theme-color"]').content,
    origBody: orig.contentDocument.body.className, nextBody: next.contentDocument.body.className,
    origHeight: orig.contentDocument.documentElement.scrollHeight, nextHeight: next.contentDocument.documentElement.scrollHeight };
  const diffs = [];
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n && diffs.length < 25; i++) {
    const x = a[i], y = b[i];
    if (!x || !y) { diffs.push({ i, missing: x ? `next ends; orig ${x.sig}` : `orig ends; next ${y.sig}` }); break; }
    const d = {};
    if (x.sig !== y.sig) d.sig = [x.sig, y.sig];
    if (x.text !== y.text) d.text = [x.text, y.text];
    if (x.attrs !== y.attrs) d.attrs = [x.attrs, y.attrs];
    if (x.box !== y.box) d.box = [x.box, y.box];
    if (x.pseudo !== y.pseudo) d.pseudo = [x.pseudo, y.pseudo];
    for (const p of PROPS) if (x.style[p] !== y.style[p]) (d.style ??= {})[p] = [x.style[p], y.style[p]];
    if (Object.keys(d).length) diffs.push({ i, el: x.sig, ...d });
  }
  orig.remove(); next.remove();
  return { width, theme, counts: [a.length, b.length], meta, diffCount: diffs.length, diffs };
};
"ready";
