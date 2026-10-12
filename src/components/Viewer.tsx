import { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import type { Detail, Lang, Panel } from "../model";
import { details } from "../data/details";
import { panelNames } from "../data/threads";
import {
  Plus,
  Minus,
  Scan,
  MapPin,
  Maximize,
  LoaderCircle,
  RotateCcw,
} from "lucide-react";
export const asset = (path: string) =>
  `${import.meta.env?.BASE_URL ?? "./"}art/${path}`;
interface Props {
  lang: Lang;
  selected: string | null;
  markers: boolean;
  onSelect: (id: string) => void;
  onMarkers: () => void;
  onReady?: (ok: boolean) => void;
  panel: Panel | "all";
  focusRevision: number;
}
export default function Viewer({
  lang,
  selected,
  markers,
  onSelect,
  onMarkers,
  onReady,
  panel,
  focusRevision,
}: Props) {
  const host = useRef<HTMLDivElement>(null),
    navigator = useRef<HTMLDivElement>(null),
    viewer = useRef<OpenSeadragon.Viewer | null>(null);
  const selectRef = useRef(onSelect),
    langRef = useRef(lang);
  selectRef.current = onSelect;
  langRef.current = lang;
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
      "loading",
    ),
    [retry, setRetry] = useState(0),
    [zoom, setZoom] = useState(1),
    [tileWarning, setTileWarning] = useState(false);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;
  useEffect(() => {
    if (!host.current || !navigator.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setStatus("loading");
    setTileWarning(false);
    const trackers: OpenSeadragon.MouseTracker[] = [];
    const v = OpenSeadragon({
      element: host.current,
      navigatorId: navigator.current.id,
      tileSources: asset("garden.dzi"),
      showNavigator: true,
      showNavigationControl: false,
      showFullPageControl: false,
      animationTime: reduced ? 0 : 1.2,
      springStiffness: 6,
      visibilityRatio: 1,
      constrainDuringPan: true,
      minZoomImageRatio: 1,
      maxZoomPixelRatio: 1.5,
      imageLoaderLimit: 6,
      maxImageCacheCount: 160,
      blendTime: reduced ? 0 : 0.15,
      gestureSettingsMouse: {
        scrollToZoom: true,
        clickToZoom: false,
        dblClickToZoom: true,
      },
      gestureSettingsTouch: {
        pinchToZoom: true,
        clickToZoom: false,
        dblClickToZoom: true,
      },
      navigatorAutoFade: false,
      navigatorBackground: "#161614",
      navigatorBorderColor: "#464642",
      navigatorDisplayRegionColor: "#efe8d9",
      crossOriginPolicy: false,
    });
    viewer.current = v;
    v.addHandler("open", () => {
      setStatus("ready");
      readyRef.current?.(true);
      const image = v.world.getItemAt(0);
      details.forEach((d, i) => {
        const b = document.createElement("button");
        b.className = "art-marker";
        b.dataset.id = d.id;
        b.dataset.panel = d.panel;
        b.dataset.number = String(i + 1).padStart(2, "0");
        b.type = "button";
        b.setAttribute("aria-label", d.title[langRef.current]);
        b.title = d.title[langRef.current];
        b.onclick = (e) => {
          e.stopPropagation();
          if (e.detail === 0) selectRef.current(d.id);
        };
        trackers.push(
          new OpenSeadragon.MouseTracker({
            element: b,
            clickHandler: (event) => {
              const click = event as OpenSeadragon.MouseTrackerEvent<Event> & {
                quick: boolean;
                preventDefaultAction: boolean;
              };
              if (click.quick) {
                selectRef.current(d.id);
                click.preventDefaultAction = true;
              }
            },
          }),
        );
        const pos = image.imageToViewportCoordinates(
          d.anchor.x * 39137,
          d.anchor.y * 22279,
        );
        v.addOverlay({
          element: b,
          location: pos,
          placement: OpenSeadragon.Placement.CENTER,
          checkResize: false,
        });
      });
      v.viewport.goHome(true);
    });
    v.addHandler("open-failed", () => {
      setStatus("error");
      readyRef.current?.(false);
    });
    v.addHandler("tile-load-failed", () => setTileWarning(true));
    v.addHandler("zoom", () => {
      const home = v.viewport.getHomeZoom();
      setZoom(v.viewport.getZoom() / home);
    });
    return () => {
      trackers.forEach((t) => t.destroy());
      viewer.current = null;
      v.destroy();
    };
  }, [retry]);
  useEffect(() => {
    const v = viewer.current;
    if (status !== "ready" || !v) return;
    const image = v.world.getItemAt(0);
    if (selected) {
      const d = details.find((x) => x.id === selected);
      if (d) {
        const b = d.box;
        const pad = 0.014;
        const r = image.imageToViewportRectangle(
          Math.max(0, b.x - pad) * 39137,
          Math.max(0, b.y - pad) * 22279,
          (b.width + pad * 2) * 39137,
          (b.height + pad * 2) * 22279,
        );
        v.viewport.fitBounds(
          r,
          window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        );
      }
    } else if (panel !== "all") {
      const boxes = {
        eden: [0.008, 0.008, 0.228, 0.98],
        garden: [0.242, 0.008, 0.519, 0.98],
        hell: [0.768, 0.008, 0.229, 0.98],
      };
      const b = boxes[panel];
      v.viewport.fitBounds(
        image.imageToViewportRectangle(
          b[0] * 39137,
          b[1] * 22279,
          b[2] * 39137,
          b[3] * 22279,
        ),
      );
    } else v.viewport.goHome();
  }, [selected, panel, status, focusRevision]);
  useEffect(() => {
    host.current
      ?.querySelectorAll<HTMLButtonElement>(".art-marker")
      .forEach((b) => {
        const d = details.find((x) => x.id === b.dataset.id)!;
        b.classList.toggle("active", b.dataset.id === selected);
        b.style.display =
          (markers || b.dataset.id === selected) &&
          (panel === "all" || b.dataset.panel === panel)
            ? "grid"
            : "none";
        b.setAttribute("aria-label", d.title[lang]);
        b.title = d.title[lang];
      });
  }, [selected, markers, lang, panel, status]);
  const reset = () => viewer.current?.viewport.goHome();
  return (
    <div className="viewer-wrap">
      <div
        className="viewer-canvas"
        ref={host}
        role="region"
        aria-label={
          lang === "ru"
            ? "Интерактивная картина. Плюс и минус — масштаб, стрелки — перемещение."
            : "Interactive painting. Plus and minus zoom; arrow keys pan."
        }
        tabIndex={0}
        onKeyDown={(e) => {
          const v = viewer.current;
          if (!v || e.target !== e.currentTarget) return;
          const arrows: { [k: string]: [number, number] } = {
            ArrowLeft: [-0.04, 0],
            ArrowRight: [0.04, 0],
            ArrowUp: [0, -0.04],
            ArrowDown: [0, 0.04],
          };
          if (arrows[e.key]) {
            e.preventDefault();
            const [x, y] = arrows[e.key];
            v.viewport.panBy(
              new OpenSeadragon.Point(
                x / v.viewport.getZoom(),
                y / v.viewport.getZoom(),
              ),
            );
            v.viewport.applyConstraints();
          }
          if (["+", "=", "-", "0"].includes(e.key)) {
            e.preventDefault();
            if (e.key === "0") reset();
            else v.viewport.zoomBy(e.key === "-" ? 0.8 : 1.25);
            v.viewport.applyConstraints();
          }
        }}
      />
      {status === "loading" && (
        <div className="viewer-status">
          <LoaderCircle className="spin" />
          <span>
            {lang === "ru" ? "Открываем картину…" : "Opening the painting…"}
          </span>
        </div>
      )}
      {status === "error" && (
        <div className="viewer-status error">
          <p>
            {lang === "ru"
              ? "Картина не загрузилась. Попробуйте ещё раз. Все тексты доступны в каталоге."
              : "The painting could not load. Try again. All texts remain available in the catalogue."}
          </p>
          <button className="button" onClick={() => setRetry((x) => x + 1)}>
            <RotateCcw size={16} />
            {lang === "ru" ? "Повторить" : "Retry"}
          </button>
        </div>
      )}
      <div className="canvas-caption">
        <span>
          {lang === "ru" ? "Иероним Босх" : "Hieronymus Bosch"} · c. 1490–1500
        </span>
        <span>
          {panel === "all"
            ? lang === "ru"
              ? "Открытый триптих"
              : "Open triptych"
            : panelNames[panel][lang]}
        </span>
      </div>
      <div className="viewer-tools">
        <button
          title={lang === "ru" ? "Приблизить (+)" : "Zoom in (+)"}
          aria-label={lang === "ru" ? "Приблизить" : "Zoom in"}
          onClick={() => {
            viewer.current?.viewport.zoomBy(1.4);
            viewer.current?.viewport.applyConstraints();
          }}
        >
          <Plus size={19} />
        </button>
        <span className="zoom-value">{zoom.toFixed(1)}×</span>
        <button
          title={lang === "ru" ? "Отдалить (−)" : "Zoom out (−)"}
          aria-label={lang === "ru" ? "Отдалить" : "Zoom out"}
          onClick={() => {
            viewer.current?.viewport.zoomBy(1 / 1.4);
            viewer.current?.viewport.applyConstraints();
          }}
        >
          <Minus size={19} />
        </button>
        <div className="tool-divider" />
        <button
          title={lang === "ru" ? "Вся картина (0)" : "Full painting (0)"}
          aria-label={lang === "ru" ? "Вся картина" : "Full painting"}
          onClick={reset}
        >
          <Scan size={18} />
        </button>
        <button
          title={lang === "ru" ? "Метки" : "Markers"}
          aria-label={lang === "ru" ? "Метки" : "Markers"}
          aria-pressed={markers}
          className={markers ? "on" : ""}
          onClick={onMarkers}
        >
          <MapPin size={17} />
        </button>
        <button
          title={lang === "ru" ? "Полноэкранный просмотр" : "Fullscreen view"}
          aria-label={
            lang === "ru" ? "Полноэкранный просмотр" : "Fullscreen view"
          }
          onClick={() => {
            const el = host.current?.parentElement;
            if (document.fullscreenElement) document.exitFullscreen();
            else el?.requestFullscreen?.();
          }}
        >
          <Maximize size={17} />
        </button>
      </div>
      <div className="navigator-shell">
        <div className="navigator-label">
          {lang === "ru" ? "ВЫ НАХОДИТЕСЬ ЗДЕСЬ" : "YOU ARE HERE"}
        </div>
        <div id="art-navigator" ref={navigator} />
      </div>
      <div className="gesture-hint">
        {lang === "ru"
          ? "Перетащите, чтобы исследовать · Прокрутите, чтобы приблизить"
          : "Drag to explore · Scroll to look closer"}
      </div>
      {tileWarning && (
        <div className="tile-warning" role="status">
          {lang === "ru"
            ? "Часть деталей не загрузилась."
            : "Some detail tiles failed to load."}
          <button onClick={() => setRetry((x) => x + 1)}>
            {lang === "ru" ? "Повторить" : "Retry"}
          </button>
        </div>
      )}
    </div>
  );
}
