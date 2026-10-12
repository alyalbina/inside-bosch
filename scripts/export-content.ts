import { writeFileSync, mkdirSync } from "node:fs";
import { details } from "../src/data/details";
import { threads, journeyIds } from "../src/data/threads";
import { sources } from "../src/data/sources";
mkdirSync("public/data", { recursive: true });
writeFileSync(
  "public/data/annotations.json",
  JSON.stringify(
    {
      schemaVersion: 1,
      image: {
        width: 39137,
        height: 22279,
        coordinateSystem: "normalised-to-exact-source-image",
        revision: "commons-2020-05-28-39137x22279",
      },
      details,
      threads,
      journeyIds,
      sources,
    },
    null,
    2,
  ) + "\n",
);
console.log("Exported 25 bilingual annotations and relationships.");
