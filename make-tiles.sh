tippecanoe -o output/tiles_0-7.mbtiles -z7 -r1 --read-parallel --cluster-distance=1 --cluster-densest-as-needed --accumulate-attribute=value:sum --no-feature-limit output/points.json.gz
tippecanoe -o output/tiles_8.mbtiles -Z8 -z8 -r1 --read-parallel --no-feature-limit --no-tile-size-limit output/points.json.gz
tile-join -e v1 -pk output/tiles_0-7.mbtiles output/tiles_8.mbtiles