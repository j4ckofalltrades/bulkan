import {
  LngLatLike,
  Map,
  NavigationControl,
  Popup,
  setWorkerUrl,
} from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import dataset from "../phl-volcanoes/data/_index.geojson"

setWorkerUrl(new URL("./vendor/maplibre-gl-worker.mjs", import.meta.url).href)

const markerImages: Record<string, string> = {
  active: new URL("../assets/active.png", import.meta.url).href,
  potentially_active: new URL(
    "../assets/potentially_active.png",
    import.meta.url
  ).href,
  inactive: new URL("../assets/inactive.png", import.meta.url).href,
}

const markerImage = (classification: string): string =>
  markerImages[classification]

const map = new Map({
  container: "map",
  style: `https://api.maptiler.com/maps/topo/style.json?key=${process.env.MAPTILER_API_KEY}`,
  center: [121.871338, 12.114523],
  bounds: [
    [114.0952145, 4.2158064],
    [126.8072562, 21.3217806],
  ],
  zoom: 6,
})

map.on("load", () => {
  map.addSource("volcanoes", {
    type: "geojson",
    data: dataset,
  })

  const classification = ["active", "potentially_active", "inactive"]

  classification.forEach((cl) => {
    map
      .loadImage(markerImage(cl))
      .then(({ data: image }) => {
        if (image) {
          map.addImage(`${cl}-marker`, image)
        }

        map.addLayer({
          id: `${cl}-volcanoes`,
          type: "symbol",
          source: "volcanoes",
          filter: ["==", "classification", cl],
          layout: {
            "icon-allow-overlap": true,
            "icon-image": `${cl}-marker`,
            "icon-size": [
              "match",
              ["get", "classification"],
              "active",
              1.3,
              "potentially_active",
              1,
              "inactive",
              0.5,
              0.5,
            ],
            "text-size": 11,
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 1.25],
            "text-anchor": "top",
          },
        })
      })
      .catch((error) => {
        throw error
      })
  })

  // show volcano details on hover
  const volcanoInfoPopup = new Popup({
    closeButton: false,
    closeOnClick: false,
  })

  classification.forEach((c) => {
    map.on("mouseenter", `${c}-volcanoes`, (e) => {
      map.getCanvas().style.cursor = "pointer"

      const feature = e.features && e.features[0]
      if (feature && "coordinates" in feature.geometry) {
        const coordinates: number[] =
          feature.geometry.coordinates.slice() as number[]
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        volcanoInfoPopup
          .setLngLat(coordinates as LngLatLike)
          .setHTML("<strong>" + feature.properties?.name + "</strong>")
          .addTo(map)
      }
    })

    map.on("mouseleave", `${c}-volcanoes`, () => {
      map.getCanvas().style.cursor = ""
      volcanoInfoPopup.remove()
    })
  })

  map.addControl(new NavigationControl({}))
})
