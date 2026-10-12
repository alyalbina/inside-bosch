"""Optional reproducible DZI pipeline. Requires Pillow; full master needs ~5 GiB RAM.
Usage: python scripts/build-pyramid.py /absolute/path/master.jpg
The published project already includes its tiles; do not run this to launch it.
"""
import argparse, hashlib, json, math
from pathlib import Path
from PIL import Image
parser=argparse.ArgumentParser();parser.add_argument('master',type=Path);args=parser.parse_args()
Image.MAX_IMAGE_PIXELS=None
im=Image.open(args.master).convert('RGB');w,h=im.size
if (w,h)!=(39137,22279):raise SystemExit('Wrong master dimensions; review annotation coordinates first.')
sha=hashlib.file_digest(args.master.open('rb'),'sha1').hexdigest()
if sha!='61b8082a24c953ce819c3238eb2d19445979945e':raise SystemExit('Wrong master revision; inspect and review provenance first.')
root=Path('public/art');root.mkdir(parents=True,exist_ok=True)
max_level=math.ceil(math.log2(max(w,h)));count=0
for level in range(max_level,-1,-1):
 scale=2**(max_level-level);size=(math.ceil(w/scale),math.ceil(h/scale));layer=im if size==(w,h) else im.resize(size,Image.Resampling.LANCZOS)
 folder=root/'garden_files'/str(level);folder.mkdir(parents=True,exist_ok=True)
 for x in range(math.ceil(size[0]/512)):
  for y in range(math.ceil(size[1]/512)):
   left=max(0,x*512-1);top=max(0,y*512-1);right=min(size[0],(x+1)*512+1);bottom=min(size[1],(y+1)*512+1)
   layer.crop((left,top,right,bottom)).save(folder/f'{x}_{y}.webp',quality=80);count+=1
 print('Level',level,'complete',flush=True)
 if layer is not im:layer.close()
(root/'garden.dzi').write_text(f'<Image xmlns="http://schemas.microsoft.com/deepzoom/2008" Format="webp" Overlap="1" TileSize="512"><Size Width="{w}" Height="{h}"/></Image>\n')
print('Created',count,'tiles')

# Generate overview and editorial crops from the same verified master.
preview=im.resize((2560,round(h*2560/w)),Image.Resampling.LANCZOS)
preview.save(root/'overview.jpg',quality=85);preview.close()
content=json.loads(Path('public/data/annotations.json').read_text())
(root/'details').mkdir(exist_ok=True)
for detail in content['details']:
 b=detail['box'];left=round(b['x']*w);top=round(b['y']*h)
 crop=im.crop((left,top,left+round(b['width']*w),top+round(b['height']*h)))
 crop.thumbnail((800,800),Image.Resampling.LANCZOS)
 crop.save(root/'details'/f"{detail['id']}.jpg",quality=86);crop.close()
hero=im.crop((round(.26*w),round(.45*h),round(.26*w)+round(.225*w),round(.45*h)+round(.5*h)))
hero=hero.resize((1000,round(hero.height*1000/hero.width)),Image.Resampling.LANCZOS)
hero.save(root/'hero.jpg',quality=88);hero.close()
print('Overview, hero and 25 crops generated from the verified master')
