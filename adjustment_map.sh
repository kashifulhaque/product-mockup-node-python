#!/bin/bash

template=$1
mask=$2
out='maps/adjustment_map.jpg'

convert $template \( -clone 0 -fill "#f1f1f1" -colorize 100 \) $mask -compose DivideSrc -composite $out