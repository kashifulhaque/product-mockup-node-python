#!/bin/bash
template=$1
mask=$2
mkdir -p mpcs maps
sh lighting_map.sh $template $mask
sh displacement_map.sh $template $mask
sh adjustment_map.sh $template $mask
