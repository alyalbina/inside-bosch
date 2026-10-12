import { test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App";
test("opening renders in Russian without storage, network or viewer, with a real local artwork", () => {
  const html = renderToStaticMarkup(React.createElement(App));
  assert.ok(html.includes("Сад"));
  assert.ok(html.includes("тайн."));
  assert.ok(html.includes("Начать путешествие"));
  assert.ok(html.includes("Исследовать свободно"));
  assert.ok(html.includes("./art/hero.jpg"));
  assert.ok(!html.includes("commons.wikimedia.org/wiki/Special:Redirect"));
});
test("stored English preference renders the complete opening navigation in English", () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => (key === "inside-bosch:lang" ? "en" : null),
    },
  });
  try {
    const html = renderToStaticMarkup(React.createElement(App));
    for (const text of [
      "The Garden",
      "of Secrets.",
      "Begin the journey",
      "Explore freely",
      "Symbol threads",
      "My journal",
      "About",
      "Skip to content",
    ])
      assert.ok(html.includes(text), text);
    assert.ok(!html.includes("Начать путешествие"));
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else
      delete (globalThis as unknown as { localStorage?: unknown }).localStorage;
  }
});
