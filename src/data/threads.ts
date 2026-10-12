import { localize as l } from "../model";
import type { Thread } from "../model";
export const threads: Thread[] = [
  {
    id: "birds",
    title: l("Птицы и наблюдатели", "Birds and watchers"),
    subtitle: l(
      "Один мотив. Четыре разных мира.",
      "One motif. Four different worlds.",
    ),
    description: l(
      "От маленькой совы в фонтане — к птицам больше человека и птичьему демону. Мы сопоставляем видимые формы; это не доказательство единого тайного кода.",
      "From a tiny owl in the fountain to birds larger than humans and a bird-headed demon. We compare visible forms; this does not prove a single secret code.",
    ),
    kind: "visual_comparison",
    detailIds: ["owl", "birds", "garden-owl", "bird-devil"],
  },
  {
    id: "water",
    title: l("Вода меняет состояние", "Water changes its state"),
    subtitle: l("Прозрачная, тёмная, замёрзшая.", "Clear, dark, frozen."),
    description: l(
      "Вода соединяет створки. Посмотрите, как меняются свет, движение и её роль в каждой сцене. Значение самого мотива не следует считать одинаковым.",
      "Water connects the panels. Look at the changes in light, movement and its role in each scene. The motif need not have the same meaning everywhere.",
    ),
    kind: "visual_comparison",
    detailIds: ["fountain", "dark-pool", "circle", "ice"],
  },
  {
    id: "shelter",
    title: l("Убежища и ловушки", "Shelters and traps"),
    subtitle: l(
      "Когда природа становится комнатой.",
      "When nature becomes a room.",
    ),
    description: l(
      "Прозрачная сфера, раковина и полое тело вмещают людей. Сравните укрытие, хрупкость и замкнутость, не превращая похожие формы в один установленный символ.",
      "A transparent sphere, a shell and a hollow body contain humans. Compare shelter, fragility and enclosure without turning similar forms into one settled symbol.",
    ),
    kind: "visual_comparison",
    detailIds: ["globe", "mussel", "pink-vessel", "tree-man"],
  },
  {
    id: "scale",
    title: l("Мир теряет масштаб", "A world loses its scale"),
    subtitle: l(
      "Кто здесь больше — человек или его желание?",
      "Which is larger: a human or their desire?",
    ),
    description: l(
      "Плоды, части тела и инструменты превышают размер человека. Что делает изменение масштаба с нашим восприятием знакомых вещей?",
      "Fruit, body parts and instruments outgrow humans. What does a change in scale do to familiar things?",
    ),
    kind: "visual_comparison",
    detailIds: ["strawberry", "berries", "ears", "harp"],
  },
  {
    id: "music",
    title: l("Беззвучная музыка", "Silent music"),
    subtitle: l(
      "Инструмент становится пространством.",
      "An instrument becomes a space.",
    ),
    description: l(
      "Волынка, арфа и лютня — разные инструменты, объединённые адским окружением. Прадо читает музыкальные инструменты этой створки как орудия пытки. Наше сопровождение современное.",
      "Bagpipe, harp and lute are different instruments sharing a hellish setting. The Prado reads this panel’s musical instruments as instruments of torture. Our soundtrack is contemporary.",
    ),
    kind: "visual_comparison",
    detailIds: ["bagpipe", "harp", "lute"],
  },
];
export const journeyIds = [
  "eden",
  "predator",
  "fountain",
  "owl",
  "circle",
  "birds",
  "berries",
  "globe",
  "garden-fountain",
  "fire",
  "ears",
  "tree-man",
  "harp",
  "bird-devil",
  "pig",
];
export const panelNames = {
  eden: l("Рай", "Eden"),
  garden: l("Сад наслаждений", "The Garden"),
  hell: l("Ад", "Hell"),
};
export const chapters = [
  {
    panel: "eden",
    number: "I",
    title: l("Несовершенный рай", "The imperfect paradise"),
    subtitle: l(
      "Всё начинается со встречи. Но безмятежен ли этот мир?",
      "It begins with a meeting. But is this world peaceful?",
    ),
  },
  {
    panel: "garden",
    number: "II",
    title: l("Сад желания", "The garden of desire"),
    subtitle: l(
      "Плоды растут. Люди кружатся. Оболочки трескаются.",
      "Fruit grows. People circle. Enclosures crack.",
    ),
  },
  {
    panel: "hell",
    number: "III",
    title: l("Обратная сторона удовольствия", "The other side of pleasure"),
    subtitle: l(
      "Знакомые формы возвращаются — с другими последствиями.",
      "Familiar forms return, with different consequences.",
    ),
  },
];
