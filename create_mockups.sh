#!/bin/bash

mkdir -p mockups

for file in tiled_images/*; do
    echo $(basename "$file")

    sh generate_mockup.sh \
        base_images/template.jpg \
        base_images/mask.png \
        $file \
        maps/displacement_map.png \
        maps/lighting_map.png \
        maps/adjustment_map.jpg \
        mockups/$(basename "$file")
done
