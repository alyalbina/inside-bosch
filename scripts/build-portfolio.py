"""Author the two static portfolio pages. No authoring packages required."""
from pathlib import Path
from html import escape
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/portfolio'
OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'fonts.css').write_text((ROOT / 'src/fonts.css').read_text().replace('../public/fonts/', '../fonts/'))
(OUT / 'assets').mkdir(exist_ok=True)
for name in ['design-system.png']:
    shutil.copy2(ROOT / 'docs/portfolio/assets' / name, OUT / 'assets' / name)

texts = {
 'ru': {
  'title':'Inside Bosch — кейс Альбины Урубкиной', 'desc':'Продуктовый и дизайнерский кейс: интерактивное исследование «Сада земных наслаждений» Босха.',
  'skip':'К содержанию', 'nav':['Замысел','Решения','Система','Результат'], 'eyebrow':'КЕЙС / ПРОДУКТОВЫЙ ДИЗАЙН И ПОЛЬЗОВАТЕЛЬСКИЙ ОПЫТ',
  'h1':'Искусство<br>смотреть<br><em>внимательнее.</em>', 'intro':'Inside Bosch — интерактивное путешествие по «Саду земных наслаждений». Один мир. Тысячи деталей. Ни одного простого ответа.',
  'action':'Исследовать картину', 'credit':'Иероним Босх · Museo del Prado', 'plate':'Подлинный фрагмент картины',
  'facts':[('Автор','Альбина Урубкина'),('Моя роль','Концепция, структура опыта, требования к контенту и визуальное направление'),('Формат','Самостоятельный проект · RU / EN<br>Работающий прототип с реализацией при помощи ИИ')],
  'question_label':'01 / ДИЗАЙНЕРСКАЯ ЗАДАЧА', 'question':'Как превратить<br>взгляд в <em>открытие?</em>',
  'problem':['Репродукция показывает всю картину, но не помогает заметить её множество историй. Объяснение легко становится стеной текста; свободный зум может оставить посетителя без ориентира.', 'Я построила опыт вокруг короткой последовательности: заметить деталь, приблизить её, прочитать наблюдение и открыть возможную трактовку. Источник и степень уверенности остаются видимыми.'],
  'quote':'Сначала увидеть. Затем прочитать. И оставить место собственному вопросу.',
  'experience_label':'02 / СТРУКТУРА ОПЫТА', 'experience':'Один мир.<br><em>Несколько способов войти.</em>',
  'worlds':[('I / ПУТЕШЕСТВИЕ','Следовать истории.','15 остановок через три главы. Внешние створки становятся прологом; сохранённая позиция позволяет продолжить.'),('II / ИССЛЕДОВАНИЕ','Выбрать свой путь.','Приближение картины, 25 областей и поиск. Войти можно с любой створки; общее изображение остаётся ориентиром.'),('III / СВЯЗИ','Заметить повторение.','Пять нитей мотивов связывают детали. Сравнения помогают продолжать исследование, сохраняя неопределённость значений.')],
  'decisions_label':'03 / ДИЗАЙНЕРСКИЕ РЕШЕНИЯ', 'decisions_title':'Меньше конкуренции.<br><em>Больше картины.</em>',
  'decisions':[('Каталог вместо панели управления.','Тёплая бумага, крупный заголовок, подлинный фрагмент и одно основное действие. Первый экран приглашает смотреть и предлагает понятный вход.'),('Тёмное пространство просмотра.','Картина становится главной поверхностью. Метки скрыты в начале; выбранная деталь обозначена. Светлая панель чтения не повторяет изображение.'),('Объяснение по запросу.','Сначала наблюдение. Затем раскрываемая трактовка с источником и открытый вопрос. Такой порядок отделяет видимое от интерпретации.'),('Место для собственной мысли.','Дневник сохраняет детали и заметки в браузере, без регистрации. JSON-экспорт позволяет забрать свои открытия.')],
  'system_label':'04 / ВИЗУАЛЬНАЯ СИСТЕМА', 'system_title':'Эстетика<br><em>художественного каталога.</em>',
  'system_copy':['Cormorant Garamond задаёт ритм заголовков; Manrope делает навигацию и подписи спокойными. Бумага, чернила и приглушённая терракота поддерживают картину.', 'Шрифты для латиницы и кириллицы включены в проект. Произведение не перекрашено и не реконструировано. Презентационные иллюстрации используют подлинную репродукцию.'],
  'system_alt':'Цвета и типографика визуальной системы Inside Bosch', 'system_caption':'Визуальное направление. Редакционная иллюстрация, не скриншот интерфейса.',
  'image_alt':'Подлинная репродукция открытого триптиха «Сад земных наслаждений»', 'resolution':'39 137 × 22 279 пикселей / локальный Deep Zoom', 'tiles':'4 559 WebP-тайлов · 17 уровней',
  'result_label':'05 / РЕЗУЛЬТАТ', 'result_title':'От замысла<br><em>к работающему опыту.</em>',
  'result_labels':['областей исследования','остановок путешествия','нитей мотивов','языка: RU / EN'],
  'verification':['Реализованы глубокий зум, поиск, связанные сцены, локальный дневник и источники. Код и первые редакционные черновики создавались с помощью ИИ; моя работа — концепция, требования, структура и направление итераций.', 'Проходят 10 автоматических проверок и production-сборка. Проверки браузерных взаимодействий, мобильных жестов, доступности и независимая искусствоведческая экспертиза ещё предстоят.'],
  'next_label':'06 / СЛЕДУЮЩИЙ ВОПРОС', 'next_title':'Помогает ли опыт<br><em>смотреть внимательнее?</em>',
  'next_copy':['Проверить на 8–12 первых посетителях: войти в главу, найти деталь, проследить мотив и вернуться к общему виду. Наблюдать сомнения, потерю ориентира и желание продолжить.', 'Аудитория и предполагаемая польза пока остаются гипотезами. Кейс не приписывает проекту непроведённые интервью, измеренный рост вовлечённости или экспертное одобрение.'],
  'closing':'Один мир.<br><em>Тысячи деталей.</em>', 'footer':'Самостоятельный проект Альбины Урубкиной. Не связан с Museo del Prado. Репродукции — Wikimedia Commons, public domain; локальные шрифты — OFL 1.1.', 'footer2':'Product & experience direction<br>AI-assisted implementation · React / TypeScript'
 },
 'en': {
  'title':'Inside Bosch — a case by Albina Urubkina', 'desc':'Product and experience design: an interactive exploration of Bosch’s Garden of Earthly Delights.',
  'skip':'Skip to content', 'nav':['Concept','Decisions','System','Result'], 'eyebrow':'A CASE / PRODUCT & EXPERIENCE DESIGN',
  'h1':'The art<br>of looking<br><em>closer.</em>', 'intro':'Inside Bosch — an interactive journey into The Garden of Earthly Delights. One world. Thousands of details. No simple answer.',
  'action':'Explore the painting', 'credit':'Hieronymus Bosch · Museo del Prado', 'plate':'An authentic artwork detail',
  'facts':[('Author','Albina Urubkina'),('My role','Concept, experience structure, editorial requirements and visual direction'),('Format','Self-initiated project · RU / EN<br>Working prototype with AI-assisted implementation')],
  'question_label':'01 / THE DESIGN QUESTION', 'question':'From a glance<br>to a <em>discovery.</em>',
  'problem':['A reproduction shows the whole painting, but does little to reveal its many stories. Explanation can become a wall of text; unconstrained zoom can leave a visitor without orientation.', 'I structured the experience around a short sequence: notice a detail, magnify it, read an observation and open a possible interpretation. Its source and degree of certainty stay visible.'],
  'quote':'Look first. Then read. Leave room for a question of your own.',
  'experience_label':'02 / EXPERIENCE STRUCTURE', 'experience':'One world.<br><em>Several ways in.</em>',
  'worlds':[('I / THE JOURNEY','Follow a story.','15 stops through three chapters. The authentic exterior panels form a prologue; a saved position lets the visitor continue.'),('II / EXPLORATION','Choose a path.','Deep zoom, 25 annotated regions and search. Enter through any panel; return to the whole painting for context.'),('III / CONNECTIONS','Notice a recurrence.','Five motif routes connect details. Comparisons lead to further exploration while keeping meanings open.')],
  'decisions_label':'03 / DESIGN DECISIONS', 'decisions_title':'A quieter frame.<br><em>More room to look.</em>',
  'decisions':[('A catalogue, not a control panel.','Warm paper, a generous title, an authentic crop and one primary action. The first screen invites looking and offers a clear entry.'),('A dark viewing room.','The painting becomes the primary surface. Markers start hidden; the selected detail stays indicated. A paper reading panel does not repeat the image.'),('Interpretation on request.','Observation first. Then an optional reading with its source and an open question. The order separates what is visible from how it is interpreted.'),('Space for a personal thought.','The journal keeps details and notes in the browser without signup. JSON export lets visitors take their discoveries with them.')],
  'system_label':'04 / VISUAL SYSTEM', 'system_title':'The rhythm<br>of an <em>art catalogue.</em>',
  'system_copy':['Cormorant Garamond gives titles their rhythm; Manrope keeps navigation and labels quiet. Paper, ink and a muted rust accent support the artwork.', 'Latin and Cyrillic fonts are bundled locally. The artwork is never recoloured or reconstructed. Presentation plates use the authentic reproduction.'],
  'system_alt':'Inside Bosch visual system: colour and typography', 'system_caption':'Visual direction. An editorial plate, not an interface screenshot.',
  'image_alt':'Authentic reproduction of the open Garden of Earthly Delights triptych', 'resolution':'39,137 × 22,279 pixels / local Deep Zoom', 'tiles':'4,559 WebP tiles · 17 levels',
  'result_label':'05 / THE RESULT', 'result_title':'From an idea<br>to a <em>working experience.</em>',
  'result_labels':['annotated regions','journey stops','motif routes','languages: RU / EN'],
  'verification':['Deep zoom, search, related scenes, a local journal and sources are implemented. Frontend code and initial editorial drafts were developed with AI assistance; my role covers concept, requirements, structure and iteration direction.', 'Ten automated checks and the production build pass. Browser interaction, mobile gestures, accessibility conformance and independent scholarly review remain to be completed.'],
  'next_label':'06 / THE NEXT QUESTION', 'next_title':'Does the experience<br>encourage <em>closer looking?</em>',
  'next_copy':['Observe 8–12 first-time visitors entering a chapter, discovering a detail, following a motif and returning to overview. Record hesitation, lost orientation and voluntary further exploration.', 'Audience and intended benefits remain hypotheses. This case does not claim unperformed interviews, measured engagement uplift or independent expert approval.'],
  'closing':'One world.<br><em>Thousands of details.</em>', 'footer':'Independent project by Albina Urubkina. Not affiliated with Museo del Prado. Reproductions: Wikimedia Commons, public domain. Local fonts: OFL 1.1.', 'footer2':'Product & experience direction<br>AI-assisted implementation · React / TypeScript'
 }
}

def paras(lines):
    return ''.join(f'<p>{escape(line)}</p>' for line in lines)

for lang, t in texts.items():
    other = 'index.en.html' if lang=='ru' else 'index.html'
    worlds = ''.join(f'<article><img src="../art/details/{image}.jpg" alt="" loading="lazy"><div class="eyebrow">{escape(label)}</div><h3>{escape(title)}</h3><p>{escape(body)}</p></article>' for image,(label,title,body) in zip(['eden','globe','tree-man'],t['worlds']))
    decisions = ''.join(f'<article class="decision"><span class="n">0{i+1}</span><h3>{escape(title)}</h3><p>{escape(body)}</p></article>' for i,(title,body) in enumerate(t['decisions']))
    facts = ''.join(f'<dl><dt>{escape(label)}</dt><dd>{body}</dd></dl>' for label,body in t['facts'])
    results = ''.join(f'<div><strong>{number}</strong><span>{escape(label)}</span></div>' for number,label in zip(['25','15','5','2'],t['result_labels']))
    navigation = ''.join(f'<a href="#{id}">{escape(label)}</a>' for id,label in zip(['concept','decisions','system','result'],t['nav']))
    html = f'''<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{escape(t['title'])}</title><meta name="description" content="{escape(t['desc'])}"><meta name="theme-color" content="#ede9df"><link rel="icon" href="../favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="case.css"></head>
<body><a class="skip" href="#main">{t['skip']}</a><header class="top"><div class="wrap top-inner"><a class="brand" href="#"><span class="mark" aria-hidden="true"><i></i><i></i><i></i></span>INSIDE BOSCH</a><nav class="nav" aria-label="{'Разделы кейса' if lang=='ru' else 'Case sections'}">{navigation}</nav><div class="langs"><span>{lang.upper()}</span> / <a href="{other}" lang="{'en' if lang=='ru' else 'ru'}" hreflang="{'en' if lang=='ru' else 'ru'}">{'EN' if lang=='ru' else 'RU'}</a></div></div></header>
<main id="main"><section class="wrap hero"><div><div class="eyebrow">{t['eyebrow']}</div><h1>{t['h1']}</h1><p class="hero-intro">{t['intro']}</p><a class="action" href="../">{t['action']} <span aria-hidden="true">↗</span></a></div><figure><img src="../art/hero.jpg" alt="{t['plate']}" fetchpriority="high"><figcaption class="caption"><span>{t['credit']}</span><span>{t['plate']}</span></figcaption></figure></section><div class="wrap"><div class="facts">{facts}</div></div>
<section id="concept" class="wrap section split"><div><div class="eyebrow">{t['question_label']}</div><h2>{t['question']}</h2></div><div class="prose">{paras(t['problem'])}<p class="quote">{t['quote']}</p></div></section>
<section class="dark"><div class="wrap section"><div class="eyebrow">{t['experience_label']}</div><h2>{t['experience']}</h2><div class="worlds">{worlds}</div></div></section>
<section id="decisions" class="wrap section"><div class="eyebrow">{t['decisions_label']}</div><h2>{t['decisions_title']}</h2><div class="decisions">{decisions}</div></section>
<section id="system" class="wrap section"><div class="split"><div><div class="eyebrow">{t['system_label']}</div><h2>{t['system_title']}</h2></div><div class="prose">{paras(t['system_copy'])}</div></div><figure class="system"><img src="assets/design-system.png" alt="{t['system_alt']}" loading="lazy"><figcaption>{t['system_caption']}</figcaption></figure></section>
<figure class="overview"><div class="wrap"><img src="../art/overview.jpg" alt="{t['image_alt']}" loading="lazy"><figcaption class="caption"><span>{t['resolution']}</span><span>{t['tiles']}</span></figcaption></div></figure>
<section id="result" class="wrap section"><div class="eyebrow">{t['result_label']}</div><h2>{t['result_title']}</h2><div class="results">{results}</div><div class="verification">{paras(t['verification'])}</div></section>
<section class="wrap section split"><div><div class="eyebrow">{t['next_label']}</div><h2>{t['next_title']}</h2></div><div class="prose">{paras(t['next_copy'])}</div></section>
<section class="wrap closing"><h2>{t['closing']}</h2><a class="action" href="../">{t['action']} <span aria-hidden="true">↗</span></a></section></main>
<footer class="wrap footer"><p>{t['footer']}</p><p>{t['footer2']}</p></footer></body></html>'''
    (OUT / ('index.html' if lang=='ru' else 'index.en.html')).write_text(html,encoding='utf-8')
print('Authored Russian and English static portfolio pages.')
