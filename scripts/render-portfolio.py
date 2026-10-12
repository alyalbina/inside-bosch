"""Render repository editorial plates from credited local artwork and fonts.

Optional authoring dependencies: Pillow and fontTools[woff]. Not needed to run
the app. Plates are presentation graphics, not browser-interface screenshots.
"""
from pathlib import Path
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont, ImageOps
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/portfolio/assets'
OUT.mkdir(parents=True, exist_ok=True)
PAPER, INK, RUST, DARK, MUTED, LINE = '#ede9df', '#292b25', '#996149', '#181a16', '#6b6c61', '#c8c5b9'

def font(size, serif=False, italic=False):
    name = ('cormorant-garamond-latin-400-' + ('italic' if italic else 'normal')) if serif else 'manrope-latin-400-normal'
    tt = TTFont(ROOT / 'public/fonts' / (name + '.woff2'))
    tt.flavor = None
    stream = BytesIO()
    tt.save(stream)
    stream.seek(0)
    return ImageFont.truetype(stream, size)

def text(draw, pos, value, size=18, color=INK, serif=False, italic=False):
    draw.text(pos, value, font=font(size, serif, italic), fill=color, anchor='lt')

def art(canvas, name, box):
    x, y, w, h = box
    with Image.open(ROOT / 'public/art' / name) as source:
        crop = ImageOps.fit(source.convert('RGB'), (w, h), method=Image.Resampling.LANCZOS)
        canvas.paste(crop, (x, y))

def cover(w=1600, h=920, social=False):
    im = Image.new('RGB', (w, h), PAPER)
    d = ImageDraw.Draw(im)
    # Scale one authored composition for the social-preview ratio.
    if social:
        text(d, (65, 47), 'INSIDE BOSCH', 18)
        text(d, (65, 147), 'The Garden', 92, serif=True)
        text(d, (65, 238), 'of Secrets.', 92, RUST, serif=True, italic=True)
        text(d, (68, 380), 'An interactive art experience', 24, serif=True)
        text(d, (68, 495), 'PRODUCT & EXPERIENCE DESIGN', 11, MUTED)
        text(d, (68, 523), 'Albina Urubkina', 17)
        art(im, 'hero.jpg', (770, 40, 453, 560))
        im.save(OUT / 'social-preview.png', optimize=True)
        return
    text(d, (78, 58), 'INSIDE BOSCH', 20)
    text(d, (1080, 62), 'A SELF-INITIATED CULTURAL PRODUCT', 12, MUTED)
    d.line((78, 109, 1522, 109), fill=LINE)
    text(d, (80, 171), 'THE ART OF LOOKING CLOSER', 12, MUTED)
    text(d, (68, 238), 'The Garden', 133, serif=True)
    text(d, (70, 367), 'of Secrets.', 133, RUST, serif=True, italic=True)
    text(d, (83, 550), 'One world. Thousands of details.', 33, serif=True)
    text(d, (83, 588), 'No simple answer.', 33, serif=True)
    text(d, (83, 686), 'PRODUCT & EXPERIENCE DESIGN', 11, MUTED)
    text(d, (83, 715), 'Albina Urubkina', 20)
    art(im, 'hero.jpg', (955, 148, 566, 644))
    text(d, (956, 812), 'HIERONYMUS BOSCH / MUSEO DEL PRADO', 10, MUTED)
    d.line((78, 859, 1522, 859), fill=LINE)
    text(d, (80, 883), '25 DISCOVERIES', 10, MUTED)
    text(d, (304, 883), '15 JOURNEY STOPS', 10, MUTED)
    text(d, (565, 883), '5 MOTIF ROUTES', 10, MUTED)
    text(d, (1397, 882), 'RU / EN', 11, RUST)
    im.save(OUT / 'cover.png', optimize=True)

def worlds():
    im = Image.new('RGB', (1600, 760), DARK)
    d = ImageDraw.Draw(im)
    text(d, (66, 44), 'THREE WORLDS. THREE WAYS INTO THE PAINTING.', 13, PAPER)
    entries = [('eden', 'I', 'An imperfect paradise'), ('globe', 'II', 'The garden of desire'), ('tree-man', 'III', 'The other side of pleasure')]
    for i, (name, n, title) in enumerate(entries):
        x = 66 + i * 502
        art(im, f'details/{name}.jpg', (x, 102, 464, 490))
        text(d, (x, 618), f'CHAPTER {n}', 10, '#a9b09e')
        text(d, (x, 646), title, 32, PAPER, serif=True)
    text(d, (66, 720), 'AUTHENTIC ARTWORK DETAILS / EDITORIAL PLATES', 10, '#a9b09e')
    im.save(OUT / 'three-worlds.png', optimize=True)

def system():
    im = Image.new('RGB', (1600, 780), PAPER)
    d = ImageDraw.Draw(im)
    text(d, (76, 52), 'VISUAL DIRECTION / THE ART CATALOGUE', 12, MUTED)
    d.line((76, 95, 1524, 95), fill=LINE)
    text(d, (69, 147), 'A quieter frame.', 91, serif=True)
    text(d, (76, 270), 'More room to look.', 68, RUST, serif=True, italic=True)
    text(d, (80, 403), 'Cormorant Garamond', 25, serif=True)
    text(d, (80, 445), 'MANROPE / INTERFACE & EDITORIAL LABELS', 14, MUTED)
    text(d, (945, 150), 'PAPER / INK / RUST / VIEWING ROOM', 11, MUTED)
    for i, (color, label) in enumerate([(PAPER, '#EDE9DF'), (INK, '#292B25'), (RUST, '#996149'), (DARK, '#181A16')]):
        x = 945 + (i % 2) * 285
        y = 205 + (i // 2) * 166
        d.rectangle((x, y, x+254, y+103), fill=color, outline=LINE if color==PAPER else color)
        text(d, (x, y+119), label, 12, MUTED)
    d.line((76, 578, 1524, 578), fill=LINE)
    for i, (n, title, line) in enumerate([('01', 'Look first.', 'The artwork remains the primary surface.'), ('02', 'Read on request.', 'Observation before sourced interpretation.'), ('03', 'Keep a question.', 'A journal for the visitor’s own response.')]):
        x = 80 + i*500
        text(d, (x, 616), n, 12, RUST)
        text(d, (x, 643), title, 38, serif=True)
        text(d, (x, 706), line, 14, MUTED)
    im.save(OUT / 'design-system.png', optimize=True)

cover()
cover(1280, 640, social=True)
worlds()
system()
print('Rendered four editorial presentation plates.')
