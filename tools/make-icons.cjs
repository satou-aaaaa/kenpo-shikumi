// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、三つの柱（国会・内閣・裁判所）と屋根の建物。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <polygon points="50,14 86,34 14,34" fill="#f6d77a"/>
      <g fill="#fffdf7"><rect x="22" y="38" width="12" height="36" rx="2"/><rect x="44" y="38" width="12" height="36" rx="2"/><rect x="66" y="38" width="12" height="36" rx="2"/></g>
      <rect x="14" y="76" width="72" height="10" rx="2" fill="#f6d77a"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
