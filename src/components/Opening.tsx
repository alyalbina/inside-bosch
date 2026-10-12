import type { Lang } from "../model";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { chapters } from "../data/threads";
const asset = (p: string) => `${import.meta.env?.BASE_URL ?? "./"}art/${p}`;
interface Props {
  lang: Lang;
  onJourney: () => void;
  onExplore: () => void;
  onSources: () => void;
  onDetail: () => void;
  onChapter: (i: number) => void;
}
export default function Opening({
  lang,
  onJourney,
  onExplore,
  onSources,
  onDetail,
  onChapter,
}: Props) {
  const tr = (ru: string, en: string) => (lang === "ru" ? ru : en);
  return (
    <main id="main" className="opening">
      <section className="opening-spread" aria-labelledby="opening-title">
        <div className="opening-content">
          <div className="edition">
            <span>
              {tr(
                "ИСКУССТВО ВНИМАТЕЛЬНОГО ВЗГЛЯДА",
                "THE ART OF LOOKING CLOSER",
              )}
            </span>
            <span>VOL. 001</span>
          </div>
          <h1 id="opening-title">
            {tr("Сад", "The Garden")}
            <br />
            <em>{tr("тайн.", "of Secrets.")}</em>
          </h1>
          <p className="hero-subtitle">
            {tr(
              "Один мир. Тысячи деталей.",
              "One world. Thousands of details.",
            )}
            <br />
            {tr("Ни одного простого ответа.", "No simple answer.")}
          </p>
          <p className="hero-copy">
            {tr(
              "Путешествие по «Саду земных наслаждений» Иеронима Босха. Следуйте за странными формами, приближайте незаметное и меняйте своё первое впечатление.",
              "A journey into Hieronymus Bosch’s Garden of Earthly Delights. Follow strange forms, magnify the overlooked, and reconsider your first impression.",
            )}
          </p>
          <div className="hero-actions">
            <button className="button primary" onClick={onJourney}>
              {tr("Начать путешествие", "Begin the journey")}
              <ArrowRight size={18} />
            </button>
            <button className="text-button" onClick={onExplore}>
              {tr("Исследовать свободно", "Explore freely")}
              <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="hero-meta">
            <span>25 {tr("открытий", "discoveries")}</span>
            <span>5 {tr("нитей символов", "symbol threads")}</span>
            <span>RU / EN</span>
          </div>
        </div>
        <figure className="hero-visual">
          <div className="hero-plate">
            <img
              src={asset("hero.jpg")}
              alt={tr(
                "Фрагмент подлинной центральной створки: птицы, прозрачная сфера и люди с огромными плодами",
                "An authentic central-panel detail: birds, a transparent globe, and people with enormous fruit",
              )}
            />
            <button
              className="hero-detail"
              onClick={onDetail}
              aria-label={tr(
                "Приблизить: счастье под стеклом",
                "Look closer: happiness under glass",
              )}
            >
              <span className="hero-dot" />
              <span className="hero-detail-label">
                {tr("Счастье под стеклом", "Happiness under glass")}
                <ArrowUpRight size={14} />
              </span>
            </button>
            <span className="plate-index">II / XXV</span>
          </div>
          <figcaption>
            <span>
              {tr(
                "Иероним Босх · около 1490–1500",
                "Hieronymus Bosch · c. 1490–1500",
              )}
            </span>
            <button onClick={onSources}>
              {tr("О произведении", "About the artwork")}
              <ArrowUpRight size={12} />
            </button>
          </figcaption>
          <span className="vertical-caption">
            THE GARDEN OF EARTHLY DELIGHTS / MUSEO DEL PRADO
          </span>
        </figure>
      </section>
      <section
        className="opening-chapters"
        aria-label={tr("Главы путешествия", "Journey chapters")}
      >
        <div className="chapter-introduction">
          <span className="eyebrow">
            {tr("ТРИ МИРА ВНУТРИ ОДНОГО", "THREE WORLDS WITHIN ONE")}
          </span>
          <p>{tr("Войдите с любой стороны.", "Enter from any side.")}</p>
        </div>
        {chapters.map((c, i) => (
          <button
            key={c.panel}
            className="chapter-entry"
            onClick={() => onChapter([0, 4, 9][i])}
          >
            <img
              src={asset(`details/${["eden", "birds", "tree-man"][i]}.jpg`)}
              alt=""
            />
            <span className="chapter-entry-text">
              <small>
                {tr("ГЛАВА", "CHAPTER")} {c.number}
              </small>
              <strong>{c.title[lang]}</strong>
            </span>
            <ArrowUpRight size={16} />
          </button>
        ))}
      </section>
      <footer className="opening-footer">
        <span>
          {tr(
            "Независимое исследование. Искусство остаётся открытым вопросом.",
            "An independent exploration. Art remains an open question.",
          )}
        </span>
        <button onClick={onSources}>
          {tr("Источники и авторство", "Sources & credits")}
          <ArrowUpRight size={14} />
        </button>
      </footer>
    </main>
  );
}
