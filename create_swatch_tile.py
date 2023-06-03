from PIL import Image
from tqdm import tqdm
import os

# folder with swatches
folder = 'swatches'
scale = 5
try:
    os.mkdir('tiled_images')
except FileExistsError:
    pass

def tiled_images(image_path, image_name):
    # Load the image
    input_image = Image.open(image_path)

    # Get the dimensions of the input image
    width, height = input_image.size

    if width == height:
        # Create a new image with {scale} times width and height of the input image
        output_image = Image.new("RGB", (scale * width, scale * height))

        # Paste the input image into the output image 'scale' times
        for x in range(scale):
            for y in range(scale):
                output_image.paste(input_image, (x * width, y * height))

        # Save the output image
        image_name = image_name.split(".")[0]
        img_name = os.path.join("tiled_images", f'{image_name}.jpg')
        output_image.save(img_name)

for filename in tqdm(os.listdir(folder), bar_format='{l_bar}{bar:20}{r_bar}{bar:-10b}'):
    image_path = os.path.join(folder,filename)
    image_name = filename
    tiled_images(image_path, image_name)
