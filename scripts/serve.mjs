import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream, existsSync, statSync } from "node:fs";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".dzi": "application/xml",
  ".json": "application/json; charset=utf-8",
};
const server = http.createServer((req, res) => {
  let request;
  try {
    request = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400);
    res.end();
    return;
  }
  if (request.endsWith("/")) request += "index.html";
  const relative = request.replace(/^\/+/, "");
  let file;
  for (const folder of ["dist", "public"]) {
    const base = path.join(root, folder);
    const candidate = path.resolve(base, relative);
    if (
      candidate.startsWith(base + path.sep) &&
      existsSync(candidate) &&
      statSync(candidate).isFile()
    ) {
      file = candidate;
      break;
    }
  }
  if (!file) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  res.writeHead(200, {
    "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
  });
  createReadStream(file).pipe(res);
});
server.on("error", (error) => {
  console.error("Could not start preview:", error.message);
  process.exit(1);
});
server.listen(4173, "127.0.0.1", () =>
  console.log(
    "Inside Bosch: http://localhost:4173\nKeep this window open. Press Ctrl+C to stop.",
  ),
);
