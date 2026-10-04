"""Split original five-frame crop sheets into aligned mobile WebP sprites."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "art-source"
OUTPUT = ROOT / "app" / "src" / "main" / "assets" / "art" / "crops"
OUTPUT.mkdir(parents=True, exist_ok=True)

for crop in ("rice", "lotus", "banana", "morning_glory"):
    sheet = Image.open(SOURCE / f"crop-stages-{crop}.png").convert("RGBA")
    width, height = sheet.size
    panels = [sheet.crop((round(i * width / 5), 0, round((i + 1) * width / 5), height)) for i in range(5)]
    boxes = []
    for panel in panels:
        alpha = panel.getchannel("A")
        mask = alpha.point(lambda value: 255 if value > 12 else 0)
        boxes.append(mask.getbbox() or (0, 0, panel.width, panel.height))
    maximum_width = max(right - left for left, top, right, bottom in boxes)
    maximum_height = max(bottom - top for left, top, right, bottom in boxes)
    scale = min(236 / maximum_width, 236 / maximum_height)
    for stage, (panel, box) in enumerate(zip(panels, boxes)):
        frame = panel.crop(box)
        size = (max(1, round(frame.width * scale)), max(1, round(frame.height * scale)))
        frame = frame.resize(size, Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
        canvas.alpha_composite(frame, ((256 - size[0]) // 2, 250 - size[1]))
        canvas.save(OUTPUT / f"{crop}-{stage}.webp", "WEBP", quality=86, method=6)
    print(crop, "five stages", maximum_width, maximum_height)
