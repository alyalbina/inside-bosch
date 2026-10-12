import { BookOpen, GitBranch, Info } from "lucide-react";
import type { Lang } from "../model";
interface Props {
  lang: Lang;
  dark: boolean;
  saved: number;
  onHome: () => void;
  onThreads: () => void;
  onJournal: () => void;
  onAbout: () => void;
  onLanguage: () => void;
}
export default function Header({
  lang,
  dark,
  saved,
  onHome,
  onThreads,
  onJournal,
  onAbout,
  onLanguage,
}: Props) {
  const tr = (ru: string, en: string) => (lang === "ru" ? ru : en);
  return (
    <header className={`header ${dark ? "header-dark" : "header-light"}`}>
      <button
        className="brand"
        onClick={onHome}
        aria-label={tr("Inside Bosch — начало", "Inside Bosch — home")}
      >
        <span className="triptych-logo">
          <i />
          <i />
          <i />
        </span>
        <span>
          INSIDE BOSCH<small>AN EXPLORATION IN ART</small>
        </span>
      </button>
      <nav
        className="header-nav"
        aria-label={tr("Основная навигация", "Main navigation")}
      >
        <button onClick={onThreads}>
          <GitBranch size={16} />
          <span>{tr("Нити символов", "Symbol threads")}</span>
        </button>
        <button onClick={onJournal}>
          <BookOpen size={16} />
          <span>{tr("Мой дневник", "My journal")}</span>
          {saved > 0 && <b className="count">{saved}</b>}
        </button>
        <button className="about-nav" onClick={onAbout}>
          <Info size={16} />
          <span>{tr("О проекте", "About")}</span>
        </button>
      </nav>
      <button
        className="language"
        onClick={onLanguage}
        aria-label={tr("Switch to English", "Переключить на русский")}
      >
        <span className={lang === "ru" ? "current" : ""}>RU</span>
        <i>/</i>
        <span className={lang === "en" ? "current" : ""}>EN</span>
      </button>
    </header>
  );
}
