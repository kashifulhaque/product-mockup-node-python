import os
import subprocess
import progressbar

os.makedirs('mockups', exist_ok = True)
files = os.listdir('tiled_images')
progress = progressbar.ProgressBar(
    maxval = len(files),
    widgets = [
        progressbar.Bar('=', '[', ']'), ' ', progressbar.Percentage()
    ]
)

for i, file in enumerate(files):
    progress.update(i)
    subprocess.call(
        [
            'sh',
            'generate_mockup.sh',
            'base_images/template.jpg',
            'base_images/mask.png',
            os.path.join('tiled_images', file),
            'maps/displacement_map.png',
            'maps/lighting_map.png',
            'maps/adjustment_map.jpg',
            os.path.join('mockups', os.path.basename(file))
        ]
    )

progress.finish()
