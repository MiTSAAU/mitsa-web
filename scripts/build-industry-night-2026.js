const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "industry_night_2026");
const outDir = path.join(root, "dist");

const jsxFiles = [
  "components/Tilt.jsx",
  "components/Countdown.jsx",
  "components/Nav.jsx",
  "components/Hero.jsx",
  "components/Meta.jsx",
  "components/Panelists.jsx",
  "components/About.jsx",
  "components/Footer.jsx",
  "app.jsx",
];

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

copyDir(path.join(sourceDir, "js"), path.join(outDir, "js"));
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

const bundle = jsxFiles
  .map((file) => {
    const sourcePath = path.join(sourceDir, file);
    const source = fs.readFileSync(sourcePath, "utf8");
    const result = babel.transformSync(source, {
      filename: file,
      presets: [["@babel/preset-react", { runtime: "classic" }]],
      comments: true,
      compact: false,
    });
    return `/* ${file} */\n${result.code}`;
  })
  .join("\n\n");

fs.writeFileSync(path.join(outDir, "app.bundle.js"), bundle);

let html = fs.readFileSync(path.join(sourceDir, "Industry Night.html"), "utf8");

html = html.replace(/\s+integrity="[^"]*"/g, "");
html = html.replace(
  /\n<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+"[^>]*><\/script>/,
  ""
);
html = html.replace(
  /\n<script type="text\/babel" src="components\/Tilt\.jsx"><\/script>[\s\S]*?\n<script type="text\/babel" src="app\.jsx"><\/script>/,
  '\n<script src="app.bundle.js"></script>'
);

fs.writeFileSync(path.join(outDir, "index.html"), html);

console.log("Built Industry Night 2026 to dist/");
