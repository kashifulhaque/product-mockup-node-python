## **Generate mockups using [ImageMagick](https://imagemagick.org/index.php)**

**I think you should read my blog post regarding this, [click here](https://ifkash.hashnode.dev/imagemagick-product-mockups)**

Even if you don't read the blog, I will TL;DR it here for you.

### **What is a product mockup?**
A product mockup is a digital representation of what the physical product is supposed to look like. You see a t-shirt, wonder what it would look like with a design you fancy, make a product mockup

### **Why node, python or ImageMagick to create product mockup?**
Well, you can create product mockups very easily using tools like Adobe Photoshop, but what if you have to create product mockups on thousands of items, on demand, and on a web server environment? You rely on tools like ImageMagick

### **Steps to use this repo**

1. Clone this repo first `git clone https://github.com/kashifulhaque/product-mockup-node-python`
2. `cd product-mockup-node-python`
3. Go to `base_images` directory, replace the `template.jpg` with your base image, and the `mask.png` with the mask of the area you wish to replace (Don't rename the files, otherwise the scripts will break, well if you can fix those scripts then you can rename the files as well, no worries)
4. Add your swatch to the `swatches` directory, remove existing if you want
5. [OPTIONAL] If you want to tile your images to form a bigger image, run the `create_swatch_tile.py` file, make sure to install it's requirements first by running `pip install -r requirements.txt`
6. Generate the masks by running the `create_maps.sh` file with 2 arguments, first one being the template and second one mask. Example code: `sh create_maps.sh base_images/template.jpg base_images/mask.png`
7. Once the maps are generated, you can run any of the `create_mockup(s)` file, node, python or shell script (I would recommend running the shell script)
8. Your final product mockup would be stored under the `mockups` directory (which will get created)

**Facing trouble running this? Raise an issue and I will try to help**
