import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  BookOpen,
  GitBranch,
  Search,
  X,
  Check,
  Eye,
  Volume2,
  VolumeX,
  Info,
  ChevronRight,
  Download,
} from "lucide-react";
import type { Detail, Journal, Lang, Panel } from "./model";
import { details, byId } from "./data/details";
import { sources } from "./data/sources";
import { chapters, journeyIds, panelNames, threads } from "./data/threads";
import {
  emptyJournal,
  nextIndex,
  parseJournal,
  STORAGE_KEY,
  toggleId,
} from "./state";
import { useAmbient } from "./audio";
import Modal from "./components/Modal";
import Opening from "./components/Opening";
import Header from "./components/Header";
import Inspector from "./components/Inspector";
const Viewer = lazy(() => import("./components/Viewer"));
const asset = (p: string) => `${import.meta.env?.BASE_URL ?? "./"}art/${p}`;
const ids = details.map((d) => d.id),
  threadIds = threads.map((t) => t.id);
type Mode = "opening" | "journey" | "explore";
type Overlay =
  | "sources"
  | "journal"
  | "threads"
  | "catalogue"
  | "epilogue"
  | "prologue"
  | null;
export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem("inside-bosch:lang") === "en" ? "en" : "ru";
    } catch {
      return "ru";
    }
  });
  const [journal, setJournal] = useState<Journal>(() => {
    try {
      return parseJournal(localStorage.getItem(STORAGE_KEY), ids, threadIds);
    } catch {
      return emptyJournal();
    }
  });
  const [focusRevision, setFocusRevision] = useState(0);
  const [storageFailed, setStorageFailed] = useState(false),
    [mode, setMode] = useState<Mode>("opening"),
    [selected, setSelected] = useState<string | null>(null),
    [panel, setPanel] = useState<Panel | "all">("all"),
    [markers, setMarkers] = useState(false),
    [overlay, setOverlay] = useState<Overlay>(null),
    [thread, setThread] = useState<string | null>(null),
    [threadStep, setThreadStep] = useState(0),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState<Panel | "all">("all"),
    [savedOnly, setSavedOnly] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tr = (ru: string, en: string) => (lang === "ru" ? ru : en);
  const detail = selected ? byId[selected] : null;
  const ambient = useAmbient(detail?.panel ?? panel);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = tr(
      "Inside Bosch — Сад тайн",
      "Inside Bosch — The Garden of Secrets",
    );
    try {
      localStorage.setItem("inside-bosch:lang", lang);
    } catch {}
  }, [lang]);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(journal));
    } catch {
      setStorageFailed(true);
    }
  }, [journal]);
  const openDetail = (id: string, newMode?: Mode) => {
    if (!byId[id]) return;
    if (newMode) setMode(newMode);
    setSelected(id);
    setFocusRevision((x) => x + 1);
    setPanel("all");
    setJournal((j) => ({ ...j, seen: [...new Set([...j.seen, id])] }));
  };
  const startJourney = () => {
    setThread(null);
    setMode("journey");
    const i = Math.min(journal.journeyIndex, journeyIds.length - 1);
    openDetail(journeyIds[i]);
  };
  const openExplore = () => {
    setThread(null);
    setMode("explore");
    setSelected(null);
    setPanel("all");
  };
  const journeyStep = (delta: number) => {
    if (journal.journeyIndex >= journeyIds.length - 1 && delta > 0) {
      setOverlay("epilogue");
      return;
    }
    const i = nextIndex(journal.journeyIndex, journeyIds.length, delta);
    setJournal((j) => ({ ...j, journeyIndex: i }));
    openDetail(journeyIds[i]);
  };
  const chooseJourney = (i: number) => {
    setThread(null);
    setMode("journey");
    setJournal((j) => ({ ...j, journeyIndex: i }));
    openDetail(journeyIds[i]);
  };
  const selectCanvas = (id: string) => {
    setThread(null);
    openDetail(id, "explore");
  };
  const beginThread = (id: string) => {
    const t = threads.find((x) => x.id === id)!;
    setThread(id);
    setThreadStep(0);
    openDetail(t.detailIds[0], "explore");
    setJournal((j) => ({ ...j, threads: [...new Set([...j.threads, id])] }));
    setOverlay(null);
  };
  const advanceThread = (delta: number) => {
    const t = threads.find((x) => x.id === thread);
    if (!t) return;
    const i = nextIndex(threadStep, t.detailIds.length, delta);
    setThreadStep(i);
    openDetail(t.detailIds[i]);
  };
  useEffect(() => {
    if (detail && mode !== "opening")
      titleRef.current?.focus({ preventScroll: true });
  }, [selected, mode]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (
        overlay ||
        el.closest(
          "input,textarea,button,select,[contenteditable],.viewer-wrap",
        )
      )
        return;
      if (e.key === "Escape") {
        setSelected(null);
        setThread(null);
      }
      if (mode === "journey" && e.key === "ArrowRight") {
        e.preventDefault();
        journeyStep(1);
      }
      if (mode === "journey" && e.key === "ArrowLeft") {
        e.preventDefault();
        journeyStep(-1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
  const save = (id: string) =>
    setJournal((j) => ({ ...j, saved: toggleId(j.saved, id) }));
  const exportJournal = () => {
    const text = JSON.stringify(
      {
        project: "Inside Bosch",
        exportedAt: new Date().toISOString(),
        ...journal,
      },
      null,
      2,
    );
    const url = URL.createObjectURL(
      new Blob([text], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "inside-bosch-journal.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const activeThread = threads.find((t) => t.id === thread);
  const listTile = (d: Detail, close = true) => (
    <button
      key={d.id}
      className="detail-tile"
      onClick={() => {
        setThread(null);
        openDetail(d.id, "explore");
        if (close) setOverlay(null);
      }}
    >
      <img loading="lazy" src={asset(`details/${d.id}.jpg`)} alt="" />
      <span className="tile-info">
        <small>
          {panelNames[d.panel][lang]}{" "}
          {journal.seen.includes(d.id) && <Check size={12} />}
        </small>
        <strong>{d.title[lang]}</strong>
        <span>{d.hook[lang]}</span>
      </span>
      <ChevronRight size={18} />
    </button>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        {tr("К содержанию", "Skip to content")}
      </a>
      <Header
        lang={lang}
        dark={mode !== "opening"}
        saved={journal.saved.length}
        onHome={() => {
          setMode("opening");
          ambient.setEnabled(false);
        }}
        onThreads={() => {
          setOverlay("threads");
          setThread(null);
        }}
        onJournal={() => setOverlay("journal")}
        onAbout={() => setOverlay("sources")}
        onLanguage={() => setLang(lang === "ru" ? "en" : "ru")}
      />
      {mode === "opening" ? (
        <Opening
          lang={lang}
          onJourney={() => setOverlay("prologue")}
          onExplore={openExplore}
          onSources={() => setOverlay("sources")}
          onDetail={() => openDetail("globe", "explore")}
          onChapter={chooseJourney}
        />
      ) : (
        <main id="main" className={`workspace ${detail ? "has-detail" : ""}`}>
          <div className="explore-heading">
            <div className="mode-switch">
              <button
                className={mode === "journey" ? "active" : ""}
                aria-pressed={mode === "journey"}
                onClick={startJourney}
              >
                {tr("Путешествие", "The journey")}
              </button>
              <button
                className={mode === "explore" && !thread ? "active" : ""}
                aria-pressed={mode === "explore" && !thread}
                onClick={() => {
                  setThread(null);
                  setMode("explore");
                }}
              >
                {tr("Свободный взгляд", "Free exploration")}
              </button>
            </div>
            <span className="explore-title">
              {tr("Сад земных наслаждений", "The Garden of Earthly Delights")}
            </span>
            <button
              className="catalogue-button"
              onClick={() => setOverlay("catalogue")}
            >
              <Search size={16} />
              {tr("Все детали", "All details")}
              <span>25</span>
            </button>
          </div>
          <div className="exploration-grid">
            <section
              className="canvas-region"
              aria-label={tr("Исследование картины", "Painting exploration")}
            >
              <Suspense
                fallback={
                  <div className="viewer-wrap viewer-loading">
                    {tr("Открываем картину…", "Opening the painting…")}
                  </div>
                }
              >
                <Viewer
                  lang={lang}
                  selected={selected}
                  panel={panel}
                  focusRevision={focusRevision}
                  markers={markers}
                  onMarkers={() => setMarkers((x) => !x)}
                  onSelect={selectCanvas}
                />
              </Suspense>
              <div className="panel-strip">
                <button
                  className={panel === "all" && !selected ? "selected" : ""}
                  onClick={() => {
                    setSelected(null);
                    setPanel("all");
                  }}
                >
                  {tr("Триптих целиком", "The whole triptych")}
                  <ScanIcon />
                </button>
                {chapters.map((c) => (
                  <button
                    key={c.panel}
                    className={
                      detail?.panel === c.panel || panel === c.panel
                        ? "selected"
                        : ""
                    }
                    onClick={() => {
                      setThread(null);
                      setMode("explore");
                      setSelected(null);
                      setPanel(c.panel as Panel);
                    }}
                  >
                    <span className="chapter-number">{c.number}</span>
                    <span>{panelNames[c.panel as Panel][lang]}</span>
                  </button>
                ))}
              </div>
            </section>
            <Inspector
              lang={lang}
              detail={detail}
              index={detail ? details.indexOf(detail) : -1}
              saved={!!detail && journal.saved.includes(detail.id)}
              titleRef={titleRef}
              onSave={() => detail && save(detail.id)}
              onClose={() => {
                setSelected(null);
                setThread(null);
              }}
              onSelect={(id) => {
                setThread(null);
                openDetail(id, "explore");
              }}
              onThread={() => beginThread("birds")}
            />
          </div>
          <footer className="journey-footer">
            {activeThread ? (
              <>
                <div className="journey-info">
                  <span className="eyebrow">
                    {tr("НИТЬ СИМВОЛОВ", "SYMBOL THREAD")} · {threadStep + 1}/
                    {activeThread.detailIds.length}
                  </span>
                  <span>{activeThread.title[lang]}</span>
                </div>
                <div className="journey-dots">
                  {activeThread.detailIds.map((id, i) => (
                    <button
                      key={id}
                      className={i === threadStep ? "active" : ""}
                      aria-label={byId[id].title[lang]}
                      onClick={() => {
                        setThreadStep(i);
                        openDetail(id);
                      }}
                    />
                  ))}
                </div>
                <div className="journey-controls">
                  <button
                    className="icon-button"
                    aria-label={tr("Предыдущая деталь", "Previous detail")}
                    disabled={threadStep === 0}
                    onClick={() => advanceThread(-1)}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    className="button small"
                    onClick={() =>
                      threadStep === activeThread.detailIds.length - 1
                        ? setOverlay("threads")
                        : advanceThread(1)
                    }
                  >
                    {threadStep === activeThread.detailIds.length - 1
                      ? tr("Сравнить мотивы", "Compare the motifs")
                      : tr("Следующая связь", "Next connection")}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </>
            ) : mode === "journey" ? (
              <>
                <div className="journey-info">
                  <span className="eyebrow">
                    {tr("ПУТЕШЕСТВИЕ", "THE JOURNEY")} ·{" "}
                    {journal.journeyIndex + 1}/{journeyIds.length}
                  </span>
                  <span>
                    {
                      chapters.find(
                        (c) =>
                          c.panel ===
                          byId[journeyIds[journal.journeyIndex]]?.panel,
                      )?.title[lang]
                    }
                  </span>
                </div>
                <div className="journey-dots">
                  {journeyIds.map((id, i) => (
                    <button
                      key={id}
                      className={
                        i === journal.journeyIndex
                          ? "active"
                          : journal.seen.includes(id)
                            ? "done"
                            : ""
                      }
                      title={byId[id].title[lang]}
                      aria-label={byId[id].title[lang]}
                      onClick={() => chooseJourney(i)}
                    />
                  ))}
                </div>
                <div className="journey-controls">
                  <button
                    className="icon-button"
                    disabled={journal.journeyIndex === 0}
                    aria-label={tr("Предыдущее открытие", "Previous discovery")}
                    onClick={() => journeyStep(-1)}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    className="button small"
                    onClick={() => journeyStep(1)}
                  >
                    {journal.journeyIndex === journeyIds.length - 1
                      ? tr("Что имел в виду Босх?", "What did Bosch mean?")
                      : tr("Следующее открытие", "Next discovery")}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="journey-info">
                  <span className="eyebrow">
                    {tr("СВОБОДНОЕ ИССЛЕДОВАНИЕ", "FREE EXPLORATION")}
                  </span>
                  <span>
                    {journal.seen.length} / 25{" "}
                    {tr("деталей открыто", "details discovered")}
                  </span>
                </div>
                <span className="explore-footer-copy">
                  {tr(
                    "Каждое новое наблюдение может изменить первое впечатление.",
                    "Every new observation can change your first impression.",
                  )}
                </span>
                <button className="text-button" onClick={startJourney}>
                  {tr("Вернуться к маршруту", "Return to the journey")}
                  <ArrowRight size={16} />
                </button>
              </>
            )}
            <div className="audio-control">
              <button
                className="icon-button"
                title={tr(
                  "Современный авторский звук — включить / выключить",
                  "Contemporary original sound — on / off",
                )}
                aria-label={
                  ambient.enabled
                    ? tr("Выключить звук", "Mute sound")
                    : tr(
                        "Включить современное сопровождение",
                        "Enable contemporary soundtrack",
                      )
                }
                aria-pressed={ambient.enabled}
                onClick={() => ambient.setEnabled((x) => !x)}
              >
                {ambient.enabled ? (
                  <Volume2 size={18} />
                ) : (
                  <VolumeX size={18} />
                )}
              </button>
              {ambient.enabled && (
                <input
                  aria-label={tr("Громкость", "Volume")}
                  type="range"
                  min="0"
                  max="1"
                  step=".01"
                  value={ambient.volume}
                  onChange={(e) => ambient.setVolume(Number(e.target.value))}
                />
              )}
            </div>
          </footer>
          {(storageFailed || ambient.unavailable) && (
            <div className="status-note" role="status">
              {storageFailed
                ? tr(
                    "Браузер не разрешает сохранение. Дневник доступен в текущей сессии — его можно скачать.",
                    "Browser storage is unavailable. Your journal lasts for this session and can be exported.",
                  )
                : tr(
                    "Звуковое сопровождение недоступно в этом браузере.",
                    "The soundtrack is unavailable in this browser.",
                  )}
            </div>
          )}
        </main>
      )}
      {overlay && (
        <Modal
          title={
            overlay === "sources"
              ? tr(
                  "Произведение, источники и границы знания",
                  "Artwork, sources and the limits of knowledge",
                )
              : overlay === "journal"
                ? tr("Мой дневник открытий", "My discovery journal")
                : overlay === "threads"
                  ? tr("Нити символов", "Symbol threads")
                  : overlay === "catalogue"
                    ? tr("25 способов увидеть иначе", "25 ways to look again")
                    : overlay === "prologue"
                      ? tr(
                          "До того, как сад откроется",
                          "Before the Garden opens",
                        )
                      : tr("Что имел в виду Босх?", "What did Bosch mean?")
          }
          lang={lang}
          wide={[
            "threads",
            "catalogue",
            "journal",
            "prologue",
            "epilogue",
          ].includes(overlay)}
          onClose={() => setOverlay(null)}
        >
          {overlay === "prologue" && (
            <div className="prologue">
              <img
                src={asset("exterior.jpg")}
                alt={tr(
                  "Подлинное изображение закрытых внешних створок триптиха с миром в прозрачной сфере",
                  "The actual painted exterior of the closed triptych, showing a world inside a transparent sphere",
                )}
              />
              <div>
                <span className="eyebrow">
                  {tr(
                    "ПРОЛОГ · ЗАКРЫТЫЕ СТВОРКИ",
                    "PROLOGUE · THE CLOSED WINGS",
                  )}
                </span>
                <h3>
                  {tr(
                    "Мир ещё не населён людьми.",
                    "A world without people yet.",
                  )}
                </h3>
                <p>
                  {tr(
                    "Внутри прозрачной сферы видны земля, вода и растения. Почти бесцветная живопись резко отличается от того, что ждёт внутри.",
                    "Earth, water and plants appear inside a transparent sphere. The almost colourless painting is a sharp contrast to what waits inside.",
                  )}
                </p>
                <p>
                  {tr(
                    "Прадо объясняет внешние створки как третий день Сотворения мира. Это музейная трактовка, которая задаёт библейский контекст путешествия.",
                    "The Prado explains the exterior as the third day of Creation. This museum reading gives the journey a biblical context.",
                  )}
                </p>
                <a
                  href={sources.find((s) => s.id === "easy")!.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Museo del Prado
                  <ArrowUpRight size={12} />
                </a>
                <button
                  className="button primary"
                  onClick={() => {
                    setOverlay(null);
                    startJourney();
                  }}
                >
                  {journal.seen.length && journal.journeyIndex > 0
                    ? tr("Продолжить путешествие", "Continue the journey")
                    : tr("Открыть триптих", "Open the triptych")}
                  <ArrowRight size={18} />
                </button>
                <button
                  className="text-button"
                  onClick={() => {
                    setJournal((j) => ({ ...j, journeyIndex: 0 }));
                    setOverlay(null);
                    chooseJourney(0);
                  }}
                >
                  {tr("Начать с первой детали", "Start with the first detail")}
                </button>
              </div>
            </div>
          )}
          {overlay === "sources" && (
            <div className="about-content">
              <p className="modal-lead">
                {tr(
                  "Исследование начинается с внимательного взгляда. Оно не обязательно заканчивается единственным ответом.",
                  "An investigation begins with careful looking. It need not end in a single answer.",
                )}
              </p>
              <p>
                {tr(
                  "Иероним Босх, «Сад земных наслаждений», около 1490–1500. Масло на дубовых досках. Museo Nacional del Prado, Мадрид. Датировка дана по музею и не является точным годом.",
                  "Hieronymus Bosch, The Garden of Earthly Delights, c. 1490–1500. Oil on oak panels. Museo Nacional del Prado, Madrid. The museum’s dating is a range, not an exact year.",
                )}
              </p>
              <div className="evidence-guide">
                <div>
                  <span className="evidence-label">
                    {tr("Наблюдение", "Observation")}
                  </span>
                  <p>
                    {tr(
                      "Описание видимого в репродукции.",
                      "A description of what appears in the reproduction.",
                    )}
                  </p>
                </div>
                <div>
                  <span className="evidence-label museum_interpretation">
                    {tr("Трактовка", "Interpretation")}
                  </span>
                  <p>
                    {tr(
                      "Чтение конкретного музея или исследователя со ссылкой.",
                      "A reading by a named museum or scholar with a reference.",
                    )}
                  </p>
                </div>
                <div>
                  <span className="evidence-label visual_comparison">
                    {tr("Сопоставление", "Comparison")}
                  </span>
                  <p>
                    {tr(
                      "Наше сравнение видимых форм. Общий смысл не считается доказанным.",
                      "Our comparison of visible forms. A shared meaning is not treated as proven.",
                    )}
                  </p>
                </div>
              </div>
              <h3>{tr("Источники", "Sources")}</h3>
              {sources.map((s) => (
                <div className="source-item" key={s.id}>
                  <small>{s.type[lang]}</small>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.title}
                    <ArrowUpRight size={14} />
                  </a>
                  <p>{s.note[lang]}</p>
                </div>
              ))}
              <div className="source-item">
                <small>
                  {tr(
                    "Внешние створки / репродукция",
                    "Exterior / reproduction",
                  )}
                </small>
                <a
                  href="https://commons.wikimedia.org/wiki/File:El_Bosco_-_Tr%C3%ADptico_del_Jard%C3%ADn_de_las_delicias.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  El Bosco — Tríptico del Jardín de las delicias
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <h3>{tr("Об этой версии", "About this version")}</h3>
              <p>
                {tr(
                  "25 визуально проверенных областей, 15 остановок маршрута, 5 сравнительных нитей. У части деталей есть музейная или исследовательская трактовка; остальные представлены как наблюдения. Независимая проверка искусствоведом ещё требуется.",
                  "25 visually checked regions, 15 journey stops and 5 comparative threads. Some details have museum or scholarly readings; others offer observations. Independent review by an art historian is still required.",
                )}
              </p>
              <h3>{tr("Изображение и звук", "Image and sound")}</h3>
              <p>
                {tr(
                  "Репродукции Wikimedia Commons отмечены как общественное достояние. Основное изображение разбито на локальные тайлы полного разрешения: браузер загружает нужный участок. Правовой статус в каждом рынке коммерческого использования требует отдельной оценки.",
                  "Wikimedia Commons marks the reproductions as public domain. The main image is served as local full-resolution tiles, loading only the needed region. Commercial reuse in each target jurisdiction requires a separate assessment.",
                )}
              </p>
              <p>
                {tr(
                  "Звуковое сопровождение — современная авторская синтезированная атмосфера, а не реконструкция музыки эпохи. В нём нет содержательных объяснений, отсутствующих в тексте. Звук включается только по нажатию.",
                  "The soundtrack is a contemporary original synthesised atmosphere, not a reconstruction of period music. It contains no explanations missing from the text. Sound starts only when requested.",
                )}
              </p>
              <p>
                {tr(
                  "Дневник сохраняется только в этом браузере. Регистрации и аналитического отслеживания нет. Проект не связан с музеем Прадо.",
                  "The journal is saved only in this browser. No sign-up or analytics tracking. This project is not affiliated with the Prado.",
                )}
              </p>
            </div>
          )}
          {overlay === "catalogue" && (
            <>
              <p className="modal-lead">
                {tr(
                  "Выберите деталь. Приближайте сколько хотите.",
                  "Choose a detail. Look as closely as you like.",
                )}
              </p>
              <div className="catalogue-filters">
                <label className="search-field">
                  <Search size={17} />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={tr(
                      "Птицы, сфера, человек-дерево…",
                      "Birds, globe, Tree-Man…",
                    )}
                    aria-label={tr("Поиск деталей", "Search details")}
                  />
                </label>
                <select
                  aria-label={tr("Створка", "Panel")}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as Panel | "all")}
                >
                  <option value="all">{tr("Все створки", "All panels")}</option>
                  {Object.entries(panelNames).map(([id, n]) => (
                    <option key={id} value={id}>
                      {n[lang]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="detail-grid">
                {details
                  .filter(
                    (d) =>
                      (filter === "all" || d.panel === filter) &&
                      [
                        d.title.ru,
                        d.title.en,
                        d.observation.ru,
                        d.observation.en,
                      ]
                        .join(" ")
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                  )
                  .map((d) => listTile(d))}
              </div>
              {!details.some(
                (d) =>
                  (filter === "all" || d.panel === filter) &&
                  [d.title.ru, d.title.en, d.observation.ru, d.observation.en]
                    .join(" ")
                    .toLowerCase()
                    .includes(query.toLowerCase()),
              ) && (
                <p>
                  {tr(
                    "Ничего не найдено. Попробуйте другой запрос.",
                    "No results. Try a different search.",
                  )}
                </p>
              )}
            </>
          )}
          {overlay === "threads" && (
            <>
              <p className="modal-lead">
                {tr(
                  "Не отдельные символы. Связи между ними.",
                  "Follow the relationships between motifs.",
                )}
              </p>
              <p>
                {tr(
                  "Эти маршруты сопоставляют то, что видно на картине. Повторение формы ещё не доказывает единое значение.",
                  "These routes compare what is visible in the painting. A repeated form does not prove a shared meaning.",
                )}
              </p>
              <div className="threads-list">
                {threads.map((t, i) => (
                  <div className="thread-row" key={t.id}>
                    <div className="thread-intro">
                      <span className="eyebrow">
                        {String(i + 1).padStart(2, "0")} ·{" "}
                        {tr("ВИЗУАЛЬНОЕ СОПОСТАВЛЕНИЕ", "VISUAL COMPARISON")}
                      </span>
                      <h3>{t.title[lang]}</h3>
                      <p>{t.description[lang]}</p>
                      <button
                        className="text-button"
                        onClick={() => beginThread(t.id)}
                      >
                        {tr("Следовать за мотивом", "Follow the motif")}
                        <ArrowRight size={17} />
                      </button>
                    </div>
                    <div className="thread-images">
                      {t.detailIds.map((id) => (
                        <button
                          key={id}
                          onClick={() => {
                            setThread(null);
                            openDetail(id, "explore");
                            setOverlay(null);
                          }}
                        >
                          <img
                            src={asset(`details/${id}.jpg`)}
                            loading="lazy"
                            alt={byId[id].observation[lang]}
                          />
                          <span>{byId[id].title[lang]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {overlay === "journal" && (
            <>
              <div className="journal-intro">
                <p className="modal-lead">
                  {journal.seen.length} / 25{" "}
                  {tr(
                    "открытий. Ваш собственный маршрут.",
                    "discoveries. A route of your own.",
                  )}
                </p>
                <button className="text-button" onClick={exportJournal}>
                  <Download size={16} />
                  {tr("Скачать дневник", "Export journal")}
                </button>
              </div>
              <div className="mode-switch journal-switch">
                <button
                  className={!savedOnly ? "active" : ""}
                  onClick={() => setSavedOnly(false)}
                >
                  {tr("Все открытия", "All discoveries")}
                </button>
                <button
                  className={savedOnly ? "active" : ""}
                  onClick={() => setSavedOnly(true)}
                >
                  {tr("Избранное", "Saved")} · {journal.saved.length}
                </button>
              </div>
              {(savedOnly ? journal.saved : journal.seen).length === 0 ? (
                <div className="empty-journal">
                  <BookOpen size={32} />
                  <h3>
                    {tr("Пока чистая страница.", "An empty page, for now.")}
                  </h3>
                  <p>
                    {tr(
                      "Откройте деталь, чтобы добавить её в дневник. Кнопка «Сохранить» добавляет в избранное.",
                      "Open a detail to add it to the journal. The Save button adds it to your favourites.",
                    )}
                  </p>
                  <button
                    className="button primary"
                    onClick={() => {
                      setOverlay(null);
                      openExplore();
                    }}
                  >
                    {tr("Начать исследование", "Start exploring")}
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="journal-list">
                  {details
                    .filter((d) =>
                      (savedOnly ? journal.saved : journal.seen).includes(d.id),
                    )
                    .map((d) => (
                      <article key={d.id}>
                        {listTile(d)}
                        <label>
                          {tr("Моя заметка или вопрос", "My note or question")}
                          <textarea
                            maxLength={4000}
                            value={journal.notes[d.id] ?? ""}
                            placeholder={d.question[lang]}
                            onChange={(e) =>
                              setJournal((j) => ({
                                ...j,
                                notes: { ...j.notes, [d.id]: e.target.value },
                              }))
                            }
                          />
                        </label>
                        <button
                          className="text-button"
                          onClick={() => save(d.id)}
                        >
                          <Bookmark
                            size={14}
                            fill={
                              journal.saved.includes(d.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                          {journal.saved.includes(d.id)
                            ? tr("Убрать из избранного", "Remove from saved")
                            : tr("В избранное", "Save this detail")}
                        </button>
                      </article>
                    ))}
                </div>
              )}
            </>
          )}
          {overlay === "epilogue" && (
            <div className="epilogue">
              <span className="eyebrow">
                {tr(
                  "ЭПИЛОГ · НЕСКОЛЬКО СПОСОБОВ ЧИТАТЬ",
                  "EPILOGUE · SEVERAL WAYS TO READ",
                )}
              </span>
              <h3>
                {tr(
                  "Одна картина. Не один ответ.",
                  "One painting. More than one answer.",
                )}
              </h3>
              <p className="modal-lead">
                {tr(
                  "Вы прошли от встречи в Эдеме к невозможным телам ада. Теперь можно вернуться в центр — и увидеть его иначе.",
                  "You have travelled from the meeting in Eden to the impossible bodies of Hell. Now you can return to the centre and see it differently.",
                )}
              </p>
              <div className="epilogue-readings">
                <div>
                  <span>01</span>
                  <h4>{tr("Предупреждение", "A warning")}</h4>
                  <p>
                    {tr(
                      "Прадо связывает триптих с грехами и их последствиями. В этом чтении удовольствие центральной створки хрупко и ведёт к наказанию.",
                      "The Prado connects the triptych with sins and consequences. In this reading, pleasure in the central panel is fragile and leads to punishment.",
                    )}
                  </p>
                  <a
                    href={sources.find((s) => s.id === "easy")!.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Museo del Prado
                    <ArrowUpRight size={12} />
                  </a>
                </div>
                <div>
                  <span>02</span>
                  <h4>
                    {tr("Вопрос к удовольствию", "A question about pleasure")}
                  </h4>
                  <p>
                    {tr(
                      "Mittman обращает внимание на противоречие между привлекательным пейзажем и тревожными деталями. Изображение удовольствия не сообщает автоматически, как именно его оценивать.",
                      "Mittman highlights the tension between the attractive landscape and unsettling details. A depiction of pleasure does not automatically tell us how to judge it.",
                    )}
                  </p>
                  <a
                    href={sources.find((s) => s.id === "mittman")!.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Asa Simon Mittman
                    <ArrowUpRight size={12} />
                  </a>
                </div>
                <div>
                  <span>03</span>
                  <h4>
                    {tr(
                      "Внимание к отдельной сцене",
                      "Attention to a single scene",
                    )}
                  </h4>
                  <p>
                    {tr(
                      "Общее чтение не расшифровывает каждую фигуру. Наблюдение, музейная трактовка и наше сопоставление — разные уровни знания.",
                      "An overall reading does not decode every figure. Observation, museum interpretation and our comparison are different kinds of knowledge.",
                    )}
                  </p>
                </div>
              </div>
              <div className="open-question">
                <small>
                  {tr("ВАШ СЛЕДУЮЩИЙ ВОПРОС", "YOUR NEXT QUESTION")}
                </small>
                <p>
                  {tr(
                    "Какая деталь хуже всего укладывается в ваше первое объяснение картины?",
                    "Which detail fits your first explanation of the painting least well?",
                  )}
                </p>
              </div>
              <button
                className="button primary"
                onClick={() => {
                  setOverlay(null);
                  openExplore();
                }}
              >
                {tr("Вернуться и посмотреть ещё раз", "Return and look again")}
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
function ScanIcon() {
  return (
    <span className="overview-symbol" aria-hidden="true">
      ▤
    </span>
  );
}
