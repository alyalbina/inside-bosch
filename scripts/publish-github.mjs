import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const remote = "https://github.com/alyalbina/inside-bosch.git";
const prepareOnly = process.argv.includes("--prepare-only");
function run(args, cwd, quiet = false) {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: quiet ? "pipe" : "inherit",
  });
  if (result.error) {
    console.error("Git is required. Install Git and run this file again.");
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(
      "Git stopped. Source files are unchanged. Check repository access and authentication.",
    );
    process.exit(result.status ?? 1);
  }
  return result.stdout ?? "";
}
run(["--version"], source, true);
if (!prepareOnly) {
  console.log("Target:", remote);
  console.log(
    "Checking that the target repository is empty. Git may open its normal sign-in flow.",
  );
  const refs = run(["ls-remote", "--heads", "--tags", remote], source, true);
  if (refs.trim()) {
    console.error(
      "The target has branches or tags. Nothing was uploaded. Use a fresh empty repository.",
    );
    process.exit(1);
  }
}
const destination = mkdtempSync(path.join(os.tmpdir(), "inside-bosch-github-"));
const entries = [
  "src",
  "public",
  "docs",
  "tests",
  "scripts",
  "original",
  ".github",
  ".gitignore",
  "index.html",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "vite.config.ts",
  "README.md",
  "README.ru.md",
  "LICENSE",
  "THIRD_PARTY_NOTICES.md",
  "START_WINDOWS.bat",
  "PUBLISH_TO_GITHUB.bat",
];
for (const entry of entries) {
  const from = path.join(source, entry);
  if (existsSync(from))
    cpSync(from, path.join(destination, entry), {
      recursive: true,
      filter: (p) => {
        const name = path.basename(p);
        return (
          !name.startsWith(".env") &&
          ![
            ".git",
            ".openai",
            "node_modules",
            "dist",
            ".sites-runtime",
          ].includes(name)
        );
      },
    });
}
run(["init", "--initial-branch=main"], destination);
run(["add", "--all"], destination);
run(
  [
    "-c",
    "user.name=Albina Urubkina",
    "-c",
    "user.email=alyalbina@users.noreply.github.com",
    "commit",
    "-m",
    "Add Inside Bosch product and experience design prototype",
  ],
  destination,
);
run(["remote", "add", "origin", remote], destination);
console.log("Clean publication checkout:", destination);
if (prepareOnly) {
  console.log(
    "Preparation complete. No request to GitHub and no push were made.",
  );
  process.exit(0);
}
run(["push", "--set-upstream", "origin", "main"], destination);
console.log("Published to https://github.com/alyalbina/inside-bosch");
