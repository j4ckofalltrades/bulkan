<div align="center">
  <br/>
  <a href="https://github.com/j4ckofalltrades/bulkan">
    <img src="assets/logo.png" alt="Logo">
  </a>

  <p align="center">
    <a href="https://geojson.org">
      GeoJSON
    </a>
    and
    <a href="https://github.com/topojson/topojson">
      TopoJSON
    </a>
    data for volcanoes in the Philippines.
  </p>
</div>

# About

> bulkan - Filipino word for volcano.

The entire dataset is available under the [data](./data) directory, classified into active, potentially active, and inactive volcanoes.

Data sourced from [Wikipedia](https://en.wikipedia.org/wiki/List_of_active_volcanoes_in_the_Philippines) and the [PHIVOLCS](https://www.phivolcs.dost.gov.ph/index.php/volcano-hazard/volcanoes-of-the-philippines) website.

## Classification

Follows the Philippine Institute of Volcanology and Seismology (PHIVOLCS) classification according to a volcano's eruptive history:

<dl>
  <dt>Active volcanoes</dt>
  <dd>Erupted within historical times (within the last 600 years), accounts of these eruptions were documented by man erupted within the last 10,000 years based on the analyses of material from young volcanic deposits.</dd>

  <dt>Potentially active volcanoes</dt>
  <dd>Morphologically young-looking but with no historical or analytical records of eruption.</dd>

  <dt>Inactive volcanoes</dt>
  <dd>No recorded eruptions, physical form has been intensively weathered and eroded, bearing deep and long gullies.</dd>
</dl>

## Visualization

- Interactive map at [bulkan.vercel.app](https://bulkan.vercel.app)
- View the rendered [geojson](data/geojson/_index.geojson) and [topojson](data/topojson/index.topojson) directly in GitHub
- View the GeoJSON files at [geojson.io](https://geojson.io)
- View changes locally by opening [index.html](index.html)

## Metadata

Metadata for each mountain can be parsed from the `properties` field.

| field            | description                                                             | required |
|------------------|-------------------------------------------------------------------------|----------|
| `name`           | Name of the volcano                                                     | required |
| `classification` | One of the following values: `active`, `potentially_active`, `inactive` | required |

## Sample

GeoJSON and TopoJSON data for Mount Kanlaon.

- GeoJSON

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [123.132, 10.412]
  },
  "properties": {
    "name": "Kanlaon",
    "classification": "active"
  }
}
```

```geojson
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [123.132, 10.412]
  },
  "properties": {
    "name": "Kanlaon",
    "classification": "active"
  }
}
```

- TopoJSON

```json
{
  "type": "Topology",
  "objects": {
    "_index": {
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Point",
          "coordinates": [123.132, 10.412],
          "properties": {
            "name": "Kanlaon",
            "classification": "active"
          }
        }
      ]
    }
  },
  "arcs": [],
  "bbox": [125.227721, 6.541396, 125.409816, 7.36793]
}
```

```topojson
{
  "type": "Topology",
  "objects": {
    "_index": {
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Point",
          "coordinates": [123.132, 10.412],
          "properties": {
            "name": "Kanlaon",
            "classification": "active"
          }
        }
      ]
    }
  },
  "arcs": [],
  "bbox": [125.227721, 6.541396, 125.409816, 7.36793]
}
```

## Contributing

This is by no means an exhaustive list, so contributions are more than welcome.
Please read and follow the [contribution guidelines](CONTRIBUTING.md).
