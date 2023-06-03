#!/bin/bash

normalized_template_map_tmp='mpcs/normalized_template_map_tmp.mpc'
template=$1
mask=$2

convert $template $mask -alpha off -colorspace gray -compose CopyOpacity -composite $normalized_template_map_tmp

brightness_delta=30
generate_lighting_map_tmp='mpcs/generate_lighting_map_tmp.mpc'
lighting_map='maps/lighting_map.png'

convert $normalized_template_map_tmp -evaluate subtract $brightness_delta% -background grey50 -alpha remove -alpha off $generate_lighting_map_tmp
convert $generate_lighting_map_tmp \( -clone 0 -fill grey50 -colorize 100 \) -compose lighten -composite $lighting_map