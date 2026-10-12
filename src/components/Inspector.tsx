import type { RefObject } from "react";
import type { Detail, Lang } from "../model";
import { ArrowUpRight, ArrowRight, Bookmark, X } from "lucide-react";
import { byId } from "../data/details";
import { sources } from "../data/sources";
import { panelNames } from "../data/threads";
const asset = (p: string) => `${import.meta.env?.BASE_URL ?? "./"}art/${p}`;
interface Props {
  lang: Lang;
  detail: Detail | null;
  saved: boolean;
  index: number;
  titleRef: RefObject<HTMLHeadingElement | null>;
  onSave: () => void;
  onClose: () => void;
  onSelect: (id: string) => void;
  onThread: () => void;
}
export default function Inspector({
  lang,
  detail,
  saved,
  index,
  titleRef,
  onSave,
  onClose,
  onSelect,
  onThread,
}: Props) {
  const tr = (ru: string, en: string) => (lang === "ru" ? ru : en);
  if (!detail)
    return (
      <aside
        className="inspector inspector-idle"
        aria-label={tr("Начало исследования", "Begin exploring")}
      >
        <div className="inspector-empty">
          <span className="eyebrow">
            {tr("СВОБОДНЫЙ ВЗГЛЯД", "AN OPEN GAZE")}
          </span>
          <h1>
            {tr("Всё начинается с любопытства.", "It begins with curiosity.")}
          </h1>
          <p>
            {tr(
              "Приблизьте любую часть картины. Или следуйте за одной деталью — и посмотрите, куда она вас приведёт.",
              "Magnify any part of the painting. Or follow a single detail, and see where it takes you.",
            )}
          </p>
          <button className="text-button" onClick={() => onSelect("globe")}>
            {tr("Найти счастье под стеклом", "Find happiness under glass")}
            <ArrowRight size={17} />
          </button>
          <div className="suggested-thread">
            <img src={asset("details/owl.jpg")} alt="" />
            <div>
              <span className="eyebrow">
                {tr("ПОСЛЕДОВАТЬ ЗА МОТИВОМ", "FOLLOW A MOTIF")}
              </span>
              <h3>
                {tr("Кто наблюдает за садом?", "Who is watching the Garden?")}
              </h3>
              <button className="text-button" onClick={onThread}>
                {tr("Следовать за птицами", "Follow the birds")}
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  return (
    <aside
      className="inspector"
      aria-label={tr("Объяснение детали", "Detail explanation")}
      key={detail.id}
    >
      <div className="inspector-top">
        <span className="eyebrow">
          {panelNames[detail.panel][lang]}{" "}
          <span className="metadata-dot">·</span>{" "}
          {String(index + 1).padStart(2, "0")} / 25
        </span>
        <button
          className="icon-button close-detail"
          aria-label={tr("Закрыть деталь", "Close detail")}
          onClick={onClose}
        >
          <X size={17} />
        </button>
      </div>
      <h1 ref={titleRef} tabIndex={-1}>
        {detail.title[lang]}
      </h1>
      <p className="detail-hook">{detail.hook[lang]}</p>
      <button
        className={`save-button ${saved ? "saved" : ""}`}
        onClick={onSave}
        aria-pressed={saved}
      >
        <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
        {saved
          ? tr("В вашем дневнике", "In your journal")
          : tr("Сохранить в дневник", "Save to your journal")}
      </button>
      <div className="reading">
        <div className="reading-label">
          {tr("ПОСМОТРИТЕ ВНИМАТЕЛЬНЕЕ", "LOOK A LITTLE CLOSER")}
        </div>
        <p className="observation">{detail.observation[lang]}</p>
        {detail.interpretations.length > 0 ? (
          <details>
            <summary>{tr("Возможное прочтение", "A possible reading")}</summary>
            {detail.interpretations.map((i, k) => (
              <div key={k} className="interpretation">
                <span className={`evidence-label ${i.kind}`}>
                  {i.kind === "museum_interpretation"
                    ? tr("Музейная трактовка", "Museum interpretation")
                    : i.kind === "scholarly_argument"
                      ? tr("Исследовательская трактовка", "Scholarly reading")
                      : tr("Визуальное сопоставление", "Visual comparison")}
                </span>
                <p>{i.text[lang]}</p>
                {i.sourceIds.map((id) => (
                  <a
                    key={id}
                    href={sources.find((s) => s.id === id)!.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sources.find((s) => s.id === id)!.title}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            ))}
          </details>
        ) : (
          <p className="observation-note">
            {tr(
              "Это наблюдение. Однозначного значения мы здесь не утверждаем.",
              "This is an observation. We do not assert a definitive meaning here.",
            )}
          </p>
        )}
        {detail.id === "eden" && (
          <details>
            <summary>
              {tr("Исторический контекст", "Historical context")}
            </summary>
            <p>{detail.context[lang]}</p>
          </details>
        )}
        <div className="open-question">
          <small>
            {tr("И ВОТ ЧТО ИНТЕРЕСНО", "SOMETHING TO WONDER ABOUT")}
          </small>
          <p>{detail.question[lang]}</p>
        </div>
        <div className="related">
          <div className="reading-label">
            {tr("ЕЩЁ ОДИН ВЗГЛЯД", "ANOTHER WAY TO LOOK")}
          </div>
          {detail.related.slice(0, 2).map((id) => (
            <button key={id} onClick={() => onSelect(id)}>
              <img src={asset(`details/${id}.jpg`)} alt="" loading="lazy" />
              <span>{byId[id].title[lang]}</span>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
        <details className="citations">
          <summary>{tr("Источники", "Sources")}</summary>
          <div className="source-links">
            {detail.sourceIds.map((id) => {
              const s = sources.find((x) => x.id === id)!;
              return (
                <a key={id} href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                  <ArrowUpRight size={12} />
                </a>
              );
            })}
          </div>
        </details>
      </div>
    </aside>
  );
}
