export type Lang = "ru" | "en";
export type Localized = Record<Lang, string>;
export type Panel = "eden" | "garden" | "hell";
export type ClaimKind =
  | "museum_interpretation"
  | "scholarly_argument"
  | "visual_comparison";
export interface Interpretation {
  text: Localized;
  kind: ClaimKind;
  sourceIds: string[];
}
export interface Detail {
  id: string;
  panel: Panel;
  title: Localized;
  hook: Localized;
  observation: Localized;
  context: Localized;
  question: Localized;
  box: { x: number; y: number; width: number; height: number };
  anchor: { x: number; y: number };
  shape: "rect";
  interpretations: Interpretation[];
  sourceIds: string[];
  motifs: string[];
  related: string[];
  coordinateReview: "visually_checked";
  editorReview: "source_checked" | "observation_only";
  assetRevision: string;
}
export interface Thread {
  id: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  kind: "visual_comparison";
  detailIds: string[];
}
export interface Journal {
  version: 1;
  seen: string[];
  saved: string[];
  notes: Record<string, string>;
  journeyIndex: number;
  threads: string[];
}
export const localize = (ru: string, en: string): Localized => ({ ru, en });
