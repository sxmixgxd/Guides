import { createRequire } from "module"
import { fileURLToPath } from "url"
import path from "path"

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Dynamically import the compiled worker
const workerPath = path.join(__dirname, "../", ".quartz-cache/transpiled-worker.mjs")

try {
  const worker = await import(workerPath)
  export const parseMarkdown = worker.parseMarkdown
  export const processHtml = worker.processHtml
} catch (e) {
  console.error("Failed to load worker:", e)
  process.exit(1)
}
