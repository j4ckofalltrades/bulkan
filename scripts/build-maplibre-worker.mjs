// maplibre-gl's ESM worker script imports a sibling maplibre-gl-shared.mjs
// file, which Parcel doesn't reliably resolve when the worker is referenced
// via `new URL(..., import.meta.url)` (see maplibre-gl's own bundler
// integration examples: they copy both files verbatim rather than let a
// bundler process them). Pre-bundling them into one self-contained file
// sidesteps that entirely, since Parcel then only has to serve one opaque
// asset with no cross-file relative import to preserve.
import * as esbuild from "esbuild"
import { fileURLToPath } from "url"
import path from "path"

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

await esbuild.build({
  entryPoints: [
    path.join(rootDir, "node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs"),
  ],
  bundle: true,
  format: "esm",
  outfile: path.join(rootDir, "src/vendor/maplibre-gl-worker.mjs"),
})
