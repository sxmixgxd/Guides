import path from "path"
import { fileURLToPath } from "url"

export const ORIGIN_NAME = "origin"
export const UPSTREAM_NAME = "upstream"
export const QUARTZ_SOURCE_BRANCH = "v5"
export const QUARTZ_SOURCE_REPO = "https://github.com/jackyzha0/quartz.git"
export const cacheDir = ".quartz-cache"
export const cacheFile = "./.quartz-cache/transpiled-build.mjs"
export const fp = fileURLToPath(import.meta.url)
export const quartzDir = path.dirname(fp)
export const PLUGINS_DIR = ".quartz/plugins"
export const LOCKFILE_PATH = "quartz.lock.json"
