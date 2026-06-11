#!/usr/bin/env node
import { createRequire } from "module"
import { fileURLToPath } from "url"
import path from "path"

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Check Node.js version
const [major] = process.versions.node.split(".").map(Number)
if (major < 22) {
  console.error(`Quartz requires Node.js 22 or higher. You are running Node.js ${process.versions.node}.`)
  process.exit(1)
}

import("./cli/handlers.js")
  .then(({ createCLI }) => createCLI())
  .catch((err) => {
    console.error("Failed to start Quartz CLI:", err)
    process.exit(1)
  })
