# Contributing

Start off by [creating an issue](https://github.com/j4ckofalltrades/bulkan/issues) that describes the proposed changes,
be it adding in new data or updating the existing dataset.

Changes should only be made to the [base GeoJSON datasets](data/geojson), as all other datasets are generated from files
in this directory.

Please read the following guidelines to ensure that your changes are consistent with the conventions in this repository.

### Creating or updating metadata

A volcano is defined as a *feature*, which the following structure:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      125.270833,
      6.9875
    ]
  },
  "properties": {
    "name": "Kanla-on",
    "classification": "active"
  }
}
```

Check that all `required` fields are populated, see [Metadata](README.md#metadata).
Once all the metadata has been filled out, verify the location by viewing it on a map. One quick way of doing this is
through [geojson.io](https://geojson.io) -- just copy and paste in the GeoJSON snippet or file.

### Formatting and generating datasets

Once the changes have been made to the base dataset, run the following commands to update the sub-datasets, and apply formatting:

1. Generate {Geo,Topo}JSON datasets by running `make dataset`.
2. Apply the proper formatting by running `make fmt`.

---

Thanks for taking the time to contribute.
