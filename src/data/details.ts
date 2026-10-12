import type { Detail, Panel, Interpretation } from "../model";
import { localize as l } from "../model";
const museum = (ru: string, en: string, source = "easy"): Interpretation => ({
  kind: "museum_interpretation",
  text: l(ru, en),
  sourceIds: [source],
});
const scholar = (
  ru: string,
  en: string,
  source = "mittman",
): Interpretation => ({
  kind: "scholarly_argument",
  text: l(ru, en),
  sourceIds: [source],
});
const compare = (ru: string, en: string): Interpretation => ({
  kind: "visual_comparison",
  text: l(ru, en),
  sourceIds: ["image"],
});
function d(
  id: string,
  panel: Panel,
  title: [string, string],
  hook: [string, string],
  b: [number, number, number, number],
  observation: [string, string],
  question: [string, string],
  motifs: string[],
  related: string[],
  interpretations: Interpretation[] = [],
  context?: [string, string],
): Detail {
  const [x, y, width, height] = b;
  return {
    id,
    panel,
    title: l(...title),
    hook: l(...hook),
    observation: l(...observation),
    question: l(...question),
    box: { x, y, width, height },
    anchor: { x: x + width / 2, y: y + height / 2 },
    shape: "rect",
    motifs,
    related,
    interpretations,
    sourceIds: [
      ...new Set(["image", ...interpretations.flatMap((v) => v.sourceIds)]),
    ],
    coordinateReview: "visually_checked",
    editorReview: interpretations.some((v) => v.kind !== "visual_comparison")
      ? "source_checked"
      : "observation_only",
    assetRevision: "commons-2020-05-28-39137x22279",
    context: context
      ? l(...context)
      : l(
          "Здесь отправная точка — само изображение. Для этой детали мы не приписываем Босху установленного символического замысла.",
          "The image itself is the starting point. This entry does not assign a settled symbolic intention to Bosch.",
        ),
  };
}
export const details: Detail[] = [
  d(
    "eden",
    "eden",
    ["Встреча в Эдеме", "A meeting in Eden"],
    ["История начинается со взгляда.", "The story begins with a glance."],
    [0.059, 0.608, 0.151, 0.231],
    [
      "Адам сидит на траве. Рядом стоит божественная фигура в розовом одеянии, держащая Еву за руку.",
      "Adam sits on the grass. Beside him, a divine figure in a pink robe holds Eve by the hand.",
    ],
    [
      "Почему взгляд Адама обращён к Еве, а её взгляд — вниз?",
      "Why does Adam look toward Eve while her gaze turns downward?",
    ],
    ["body", "water"],
    ["circle", "globe"],
    [
      scholar(
        "В диалоге Harris и Zucker сцена читается как представление Евы Адаму.",
        "Harris and Zucker read this as Eve being presented to Adam.",
        "harris",
      ),
    ],
    [
      "Персонажи отсылают к библейскому рассказу об Адаме и Еве; изображённый жест не следует путать с моментом её физического создания.",
      "The figures refer to the biblical story of Adam and Eve; the depicted gesture should not be confused with her physical creation.",
    ],
  ),
  d(
    "fountain",
    "eden",
    ["Фонтан, который кажется живым", "A fountain that seems alive"],
    ["Архитектура или растение?", "Architecture or a plant?"],
    [0.085, 0.215, 0.077, 0.327],
    [
      "Розовая конструкция стоит в воде. Её формы напоминают стебли, раковины и острые минеральные наросты.",
      "A pink structure stands in water. Its forms resemble stems, shells and pointed mineral growths.",
    ],
    [
      "Какие формы повторятся в центральной створке?",
      "Which shapes will return in the central panel?",
    ],
    ["water", "architecture", "hybrids"],
    ["garden-fountain", "owl"],
    [
      compare(
        "Сопоставьте вертикальную ось и розовые формы этого фонтана с сооружениями сада. Сходство видно; единое значение не установлено.",
        "Compare its vertical axis and pink forms with the Garden structures. The resemblance is visible; a shared meaning is not established.",
      ),
    ],
  ),
  d(
    "owl",
    "eden",
    ["Взгляд из тёмного отверстия", "A gaze from the dark"],
    ["В фонтане кто-то есть.", "There is someone inside the fountain."],
    [0.113, 0.477, 0.017, 0.038],
    [
      "В круглом отверстии основания фонтана видна маленькая сова.",
      "A small owl appears in the round opening at the fountain’s base.",
    ],
    [
      "Меняется ли впечатление от фонтана, когда вы замечаете наблюдателя?",
      "Does noticing a watcher change your impression of the fountain?",
    ],
    ["birds", "architecture"],
    ["garden-owl", "bird-devil"],
  ),
  d(
    "exotic",
    "eden",
    ["Слоны и жираф в раю", "An elephant and giraffe in Eden"],
    [
      "Знакомое соседствует с невозможным.",
      "The familiar meets the impossible.",
    ],
    [0.063, 0.239, 0.145, 0.169],
    [
      "На дальнем берегу находятся слон, жираф и другие животные; рядом растут фантастические формы.",
      "An elephant, a giraffe and other animals stand on the far bank beside fantastic forms.",
    ],
    [
      "Как Босх сочетает узнаваемых животных и вымышленные формы?",
      "How does Bosch combine recognisable animals and invented forms?",
    ],
    ["hybrids", "water"],
    ["birds", "tree-man"],
  ),
  d(
    "predator",
    "eden",
    ["Хищник в раю", "A predator in paradise"],
    [
      "В идеальном мире уже есть тревога.",
      "An ideal world already feels uneasy.",
    ],
    [0.009, 0.798, 0.061, 0.08],
    [
      "Кошачий хищник несёт небольшую добычу в пасти, неподалёку от Адама.",
      "A feline predator carries a small creature in its mouth near Adam.",
    ],
    [
      "Позволяет ли эта сцена считать рай совершенно безмятежным?",
      "Does this scene let us call Eden entirely peaceful?",
    ],
    ["hybrids", "body"],
    ["bird-devil", "eden"],
    [
      scholar(
        "Mittman выделяет хищников как тревожную деталь райского пейзажа.",
        "Mittman draws attention to predators as an unsettling feature of Eden.",
      ),
    ],
  ),
  d(
    "dark-pool",
    "eden",
    ["Тёмный водоём", "The dark pool"],
    ["Опустите взгляд ниже Адама.", "Look below Adam."],
    [0.097, 0.886, 0.137, 0.083],
    [
      "В тёмной воде нижнего правого угла левой створки видны птицы и странные существа.",
      "Birds and strange creatures appear in dark water at the lower right of the left panel.",
    ],
    [
      "Почему этот маленький участок отличается от светлого пейзажа?",
      "Why does this small area differ from the bright landscape?",
    ],
    ["water", "hybrids", "birds"],
    ["circle", "ice"],
  ),
  d(
    "circle",
    "garden",
    ["Круг желания", "The circle of desire"],
    [
      "Среди хаоса обнаруживается строгий ритм.",
      "A precise rhythm appears within the chaos.",
    ],
    [0.322, 0.326, 0.384, 0.238],
    [
      "Всадники на разных животных окружают овальный водоём с группой женщин.",
      "Riders on different animals surround an oval pool containing a group of women.",
    ],
    [
      "Это движение вперёд — или движение без выхода?",
      "Is this forward motion, or a movement with no exit?",
    ],
    ["water", "body", "hybrids"],
    ["eden", "garden-fountain"],
    [
      museum(
        "Прадо связывает круг всадников с человеческими пороками.",
        "The Prado associates the circle of riders with human vices.",
      ),
    ],
  ),
  d(
    "garden-fountain",
    "garden",
    ["Хрупкая архитектура", "Fragile architecture"],
    [
      "Вернитесь к форме, которую уже видели.",
      "Return to a shape you have already seen.",
    ],
    [0.471, 0.058, 0.065, 0.255],
    [
      "В центре дальнего водоёма стоит сине-розовое сооружение. На его округлом основании заметны разрывы.",
      "A blue-and-pink structure stands in the distant pool. Breaks appear in its rounded base.",
    ],
    [
      "Что меняется при сравнении с фонтаном Эдема?",
      "What changes when you compare it with Eden’s fountain?",
    ],
    ["architecture", "water"],
    ["fountain", "globe"],
    [
      museum(
        "Прадо читает трещины как знак недолговечности удовольствий.",
        "The Prado reads the cracks as a sign of pleasures that will not last.",
      ),
    ],
  ),
  d(
    "birds",
    "garden",
    ["Когда птицы больше людей", "When birds outgrow people"],
    [
      "Масштаб перестал подчиняться привычным правилам.",
      "Scale no longer follows familiar rules.",
    ],
    [0.25, 0.473, 0.134, 0.15],
    [
      "У воды собрались огромные птицы и маленькие человеческие фигуры. Птицы различаются цветом и строением клювов.",
      "Huge birds gather by the water beside small human figures. Their colours and beaks differ.",
    ],
    [
      "Человек управляет природой — или стал частью её игры?",
      "Do humans control nature, or have they become part of its play?",
    ],
    ["birds", "body"],
    ["owl", "bird-devil"],
    [
      compare(
        "В саду птицы возвышаются над людьми. В аду птичья голова появится у существа, которое пожирает человека. Это визуальное сопоставление.",
        "Birds tower over people in the Garden. In Hell, a bird-headed creature will swallow a human. This is a visual comparison.",
      ),
    ],
  ),
  d(
    "globe",
    "garden",
    ["Счастье под стеклом", "Happiness under glass"],
    [
      "Здесь можно укрыться. Но надолго ли?",
      "A place to shelter. But for how long?",
    ],
    [0.269, 0.643, 0.077, 0.13],
    [
      "Пара находится внутри прозрачной округлой оболочки, соединённой с растительной формой. На поверхности заметна линия разрыва.",
      "A couple occupies a transparent rounded enclosure attached to a plant form. A line of rupture is visible.",
    ],
    [
      "Защищает ли оболочка людей или подчёркивает их уязвимость?",
      "Does the enclosure protect the couple, or emphasise their vulnerability?",
    ],
    ["spheres", "body"],
    ["garden-fountain", "pink-vessel"],
    [
      museum(
        "В объяснении Прадо стеклянный шар означает хрупкость счастья.",
        "In the Prado’s explanation, the glass globe represents fragile happiness.",
      ),
    ],
  ),
  d(
    "mussel",
    "garden",
    ["Пара в раковине", "A couple inside a shell"],
    ["Обычная раковина стала комнатой.", "An ordinary shell becomes a room."],
    [0.392, 0.674, 0.089, 0.079],
    [
      "Человеческие фигуры находятся внутри большой тёмной раковины, которую несёт другая фигура.",
      "Human figures occupy a large dark shell carried by another figure.",
    ],
    [
      "Какие ещё природные формы здесь становятся человеческим жилищем?",
      "Which other natural forms become human dwellings here?",
    ],
    ["body", "hybrids"],
    ["globe", "tree-man"],
  ),
  d(
    "pink-vessel",
    "garden",
    ["Лица в розовом сосуде", "Faces in a pink vessel"],
    [
      "Найдите границу между телом и предметом.",
      "Find the boundary between a body and an object.",
    ],
    [0.411, 0.567, 0.071, 0.097],
    [
      "Из отверстий округлой розовой формы выглядывают человеческие лица; вокруг видны растительные отростки.",
      "Human faces look out from openings in a rounded pink form surrounded by plant-like projections.",
    ],
    [
      "Это плод, здание или вымышленное убежище?",
      "Is it a fruit, a building, or an invented shelter?",
    ],
    ["spheres", "hybrids", "architecture"],
    ["globe", "tree-man"],
  ),
  d(
    "shell-house",
    "garden",
    ["Дом без стен", "A house without walls"],
    [
      "Жилище здесь не обязательно построено.",
      "A dwelling need not be built here.",
    ],
    [0.463, 0.597, 0.067, 0.164],
    [
      "Несколько людей выглядывают из большой белой формы, похожей на раскрытую раковину.",
      "Several people emerge from a large white form resembling an open shell.",
    ],
    [
      "Можно ли чётко разделить людей и окружающий их мир?",
      "Can people be cleanly separated from the world around them?",
    ],
    ["body", "hybrids", "architecture"],
    ["mussel", "tree-man"],
  ),
  d(
    "berries",
    "garden",
    ["Ненасытный сад", "An insatiable Garden"],
    [
      "Удовольствие приобрело собственный масштаб.",
      "Pleasure takes on a scale of its own.",
    ],
    [0.386, 0.741, 0.166, 0.191],
    [
      "Группы людей держат и несут огромные тёмные ягоды и другие плоды, несоразмерные человеческому телу.",
      "Groups of people hold and carry huge dark berries and other fruit out of proportion to their bodies.",
    ],
    [
      "Плоды кажутся изобильными или чрезмерными?",
      "Does the fruit feel abundant, or excessive?",
    ],
    ["fruit", "body"],
    ["strawberry", "bird-devil"],
    [
      scholar(
        "Harris и Zucker обращают внимание на чрезмерный аппетит рядом с увеличенными плодами.",
        "Harris and Zucker draw attention to insatiable appetite beside enlarged fruit.",
        "harris",
      ),
    ],
  ),
  d(
    "strawberry",
    "garden",
    ["Огромная ягода", "The oversized berry"],
    ["Сравните её с фигурой рядом.", "Compare it with the figure beside it."],
    [0.575, 0.506, 0.043, 0.069],
    [
      "Большой розово-красный плод с семенами располагается рядом с людьми и животными.",
      "A large pink-red fruit with seeds appears beside humans and animals.",
    ],
    [
      "Почему знакомый плод становится странным, когда меняется его размер?",
      "Why does familiar fruit become strange when its size changes?",
    ],
    ["fruit", "body"],
    ["berries", "pink-vessel"],
  ),
  d(
    "garden-owl",
    "garden",
    ["Сова среди удовольствий", "An owl among pleasures"],
    [
      "Один мотив — совсем другое окружение.",
      "One motif, a different setting.",
    ],
    [0.696, 0.612, 0.034, 0.092],
    [
      "Крупная сова смотрит на зрителя среди человеческих фигур и фантастических форм.",
      "A large owl faces the viewer among human figures and fantastic forms.",
    ],
    [
      "Одинаково ли воспринимаются эта сова и сова в фонтане?",
      "Does this owl feel the same as the owl in the fountain?",
    ],
    ["birds"],
    ["owl", "bird-devil"],
  ),
  d(
    "fire",
    "hell",
    ["Горизонт в огне", "A horizon on fire"],
    ["Вода и небо больше не успокаивают.", "Water and sky no longer soothe."],
    [0.775, 0.014, 0.208, 0.212],
    [
      "В верхней части правой створки горят здания. Свет огня отражается в тёмной воде.",
      "Buildings burn in the upper right panel. Firelight reflects in dark water.",
    ],
    [
      "Как тот же горизонт превращается в другой мир?",
      "How does the same horizon become a different world?",
    ],
    ["water", "architecture"],
    ["garden-fountain", "dark-pool"],
    [
      scholar(
        "Mittman отмечает общий высокий горизонт трёх створок: пейзаж связывает разные миры.",
        "Mittman notes the shared high horizon of the three panels: landscape connects their different worlds.",
      ),
    ],
  ),
  d(
    "ears",
    "hell",
    ["Уши, которые стали чудовищем", "Ears that become a monster"],
    [
      "Часть тела больше целого человека.",
      "A body part outgrows a whole person.",
    ],
    [0.799, 0.25, 0.08, 0.107],
    [
      "Два огромных уха соединены длинным ножом. Под ними видны маленькие фигуры.",
      "Two enormous ears are joined by a long knife. Small figures appear beneath them.",
    ],
    [
      "Что случилось с человеческим масштабом после перехода в ад?",
      "What happens to human scale after entering Hell?",
    ],
    ["body", "hybrids"],
    ["birds", "tree-man"],
  ),
  d(
    "tree-man",
    "hell",
    ["Человек-дерево", "The Tree-Man"],
    ["Загляните внутрь невозможного тела.", "Look inside an impossible body."],
    [0.796, 0.327, 0.142, 0.212],
    [
      "Бледная фигура с человеческим лицом стоит на ногах-стволах, опирающихся на лодки. Полое туловище открывает сцену с людьми у стола.",
      "A pale figure with a human face stands on trunk-like legs resting in boats. Its hollow torso reveals people at a table.",
    ],
    [
      "Где заканчивается существо и начинается пространство?",
      "Where does the creature end and the space begin?",
    ],
    ["hybrids", "architecture", "body"],
    ["shell-house", "pink-vessel", "bagpipe"],
    [
      museum(
        "Каталог Прадо связывает таверну внутри туловища с чревоугодием. Личность самой фигуры остаётся спорной.",
        "The Prado catalogue connects the tavern inside the torso with gluttony. The figure’s identity remains disputed.",
        "prado",
      ),
    ],
  ),
  d(
    "bagpipe",
    "hell",
    ["Музыка над человеком-деревом", "Music above the Tree-Man"],
    ["Найдите ещё один невозможный масштаб.", "Find another impossible scale."],
    [0.867, 0.272, 0.059, 0.082],
    [
      "Над головой человека-дерева стоит огромная волынка. Вокруг неё движутся маленькие фигуры.",
      "An enormous bagpipe stands above the Tree-Man’s head. Small figures move around it.",
    ],
    [
      "Как меняется инструмент, когда он становится архитектурой?",
      "How does an instrument change when it becomes architecture?",
    ],
    ["music", "architecture", "body"],
    ["harp", "lute", "tree-man"],
  ),
  d(
    "harp",
    "hell",
    ["Арфа, которая больше не утешает", "A harp that no longer comforts"],
    ["Приблизьте струны.", "Look closer at the strings."],
    [0.774, 0.533, 0.07, 0.219],
    [
      "Гигантская арфа соседствует с человеческими телами. Один человек оказывается среди её струн.",
      "An enormous harp stands beside human bodies. One person is caught among its strings.",
    ],
    [
      "Что происходит с предметом удовольствия, когда он становится орудием боли?",
      "What happens when an object of pleasure becomes an instrument of pain?",
    ],
    ["music", "body"],
    ["lute", "bagpipe"],
    [
      museum(
        "Прадо объясняет музыкальные инструменты в аду как орудия пытки.",
        "The Prado explains the musical instruments in Hell as instruments of torture.",
      ),
    ],
  ),
  d(
    "lute",
    "hell",
    ["Лютня и человеческое тело", "A lute and a human body"],
    ["Музыку здесь видно — но не слышно.", "Here music is seen, not heard."],
    [0.829, 0.535, 0.08, 0.208],
    [
      "Большая лютня лежит рядом с арфой и человеческими фигурами. На теле одной из фигур видны нотные знаки.",
      "A large lute lies beside the harp and human figures. Musical notation appears on one figure’s body.",
    ],
    [
      "Достаточно ли нарисованных знаков, чтобы уверенно восстановить музыку?",
      "Is painted notation enough to reconstruct the music with certainty?",
    ],
    ["music", "body"],
    ["harp", "bagpipe"],
  ),
  d(
    "bird-devil",
    "hell",
    ["Пожирающий зрителя мир", "A world that devours"],
    [
      "Птица больше не выглядит безобидной.",
      "The bird no longer seems harmless.",
    ],
    [0.923, 0.596, 0.063, 0.188],
    [
      "Синее существо с птичьей головой сидит на высоком стуле и поглощает человеческую фигуру; ниже видна тёмная яма.",
      "A blue bird-headed creature sits on a tall chair and swallows a human; a dark pit appears below.",
    ],
    [
      "Как изменился мотив птицы от рая до ада?",
      "How has the bird motif changed from Eden to Hell?",
    ],
    ["birds", "hybrids", "body"],
    ["birds", "owl", "garden-owl"],
    [
      museum(
        "В каталоге Прадо эта сцена связывается с наказанием алчности.",
        "The Prado catalogue associates this scene with punishment for avarice.",
        "prado",
      ),
    ],
  ),
  d(
    "ice",
    "hell",
    ["Замёрзшая вода", "Frozen water"],
    [
      "Та же стихия, другое ощущение.",
      "The same element, a different feeling.",
    ],
    [0.885, 0.498, 0.086, 0.074],
    [
      "Под человеком-деревом располагается светлая поверхность воды или льда с маленькими фигурами.",
      "A pale expanse of water or ice with small figures lies beneath the Tree-Man.",
    ],
    [
      "Что связывает этот холодный участок с водоёмами сада?",
      "What connects this cold area with the pools in the Garden?",
    ],
    ["water", "body"],
    ["dark-pool", "circle"],
    [
      compare(
        "Вода повторяется во всех трёх створках, но цвет, свет и действия фигур меняют её восприятие.",
        "Water recurs in all three panels, but colour, light and the figures’ actions change how it feels.",
      ),
    ],
  ),
  d(
    "pig",
    "hell",
    ["Свинья в монашеском покрывале", "A pig in a nun’s veil"],
    [
      "Последняя деталь нарушает привычную иерархию.",
      "One final detail unsettles the usual hierarchy.",
    ],
    [0.934, 0.866, 0.058, 0.108],
    [
      "В нижнем правом углу свинья в головном покрывале склоняется к обнажённому мужчине. Рядом лежит документ.",
      "At the lower right, a pig wearing a veil leans toward a naked man. A document lies nearby.",
    ],
    [
      "Почему здесь смешаны животное, религиозная одежда и человеческий жест?",
      "Why combine an animal, religious clothing and a human gesture?",
    ],
    ["hybrids", "body"],
    ["tree-man", "eden"],
    [
      museum(
        "Каталог Прадо связывает свинью в монашеском покрывале с критикой духовенства.",
        "The Prado catalogue connects the pig in a nun’s veil with criticism of the clergy.",
        "prado",
      ),
    ],
  ),
];
export const byId = Object.fromEntries(details.map((d) => [d.id, d]));
