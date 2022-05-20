dataset: geojson topojson fmt

geojson:
	geojson-merge data/geojson/active.geojson data/geojson/potentially_active.geojson data/geojson/inactive.geojson > data/_index.geojson

topojson:
	geo2topo data/_index.geojson > data/_index.topojson
	geo2topo data/geojson/active.geojson > data/topojson/active.topojson
	geo2topo data/geojson/potentially_active.geojson > data/topojson/potentially_active.topojson
	geo2topo data/geojson/inactive.geojson > data/topojson/inactive.topojson

fmt:
	prettier --write data
