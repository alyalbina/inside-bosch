import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { details } from "../src/data/details";
test("native-resolution DZI and every pyramid tile are locally present", () => {
  const xml = readFileSync("public/art/garden.dzi", "utf8");
  const width = Number(xml.match(/Width="(\d+)"/)?.[1]);
  const height = Number(xml.match(/Height="(\d+)"/)?.[1]);
  const size = Number(xml.match(/TileSize="(\d+)"/)?.[1]);
  const format = xml.match(/Format="(\w+)"/)?.[1];
  assert.equal(width, 39137);
  assert.equal(height, 22279);
  assert.equal(format, "webp");
  assert.equal(size, 512);
  const max = Math.ceil(Math.log2(Math.max(width, height)));
  let expected = 0;
  for (let level = 0; level <= max; level++) {
    const scale = 2 ** (max - level);
    const cols = Math.ceil(Math.ceil(width / scale) / size),
      rows = Math.ceil(Math.ceil(height / scale) / size);
    for (let x = 0; x < cols; x++)
      for (let y = 0; y < rows; y++) {
        const path = `public/art/garden_files/${level}/${x}_${y}.${format}`;
        assert.ok(existsSync(path), path);
        assert.ok(statSync(path).size > 30);
        expected++;
      }
  }
  const actual = readdirSync("public/art/garden_files")
    .filter((x) => /^\d+$/.test(x))
    .flatMap((level) =>
      readdirSync(`public/art/garden_files/${level}`).filter((x) =>
        x.endsWith(".webp"),
      ),
    ).length;
  assert.equal(actual, expected);
});
test("every annotation has its own local crop and both opening images exist", () => {
  for (const d of details)
    assert.ok(existsSync(`public/art/details/${d.id}.jpg`));
  for (const name of ["overview.jpg", "exterior.jpg", "hero.jpg"])
    assert.ok(existsSync(`public/art/${name}`));
});
