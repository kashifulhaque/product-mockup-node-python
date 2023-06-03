#!/bin/bash
template=$1
mask=$2
artwork=$3
displacement_map=$4
lighting_map=$5
adjustment_map=$6

out=$7
tmp='mpcs/mockup.mpc'

# Add border
convert $artwork -bordercolor transparent -border 1 $tmp

# Add perspective transform
#           x1  y1  h    x2  y2   w    h    x3   y3   w      x4   y4
coords='0,0,100,0,0,3000,100,4000,1500,3000,1700,4000,1500,0,1700,0'
convert $template -alpha transparent \( $tmp +distort perspective "$coords" \) -background transparent -layers merge +repage $tmp

# Set background color
convert $tmp -background transparent -alpha remove $tmp

# Add displacement
convert $tmp $displacement_map -compose displace -set option:compose:args 20x20 -composite $tmp

# Add highlights
convert $tmp \( -clone 0 $lighting_map -compose hardlight -composite \) +swap -compose CopyOpacity -composite $tmp

# Adjust colors
convert $tmp \( -clone 0 $adjustment_map -compose multiply -composite \) +swap -compose CopyOpacity -composite $tmp

# Compose artwork
convert $template $tmp $mask -compose over -composite -resize 800 $out