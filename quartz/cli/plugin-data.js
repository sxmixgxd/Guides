import fs from "fs"
import path from "path"
import YAML from "yaml"
import { PLUGINS_DIR, LOCKFILE_PATH } from "./constants.js"

export function readPluginsJson() {
  const configPath = "quartz.config.yaml"
  if (!fs.existsSync(configPath)) {
    const defaultPath = "quartz.config.default.yaml"
    if (fs.existsSync(defaultPath)) {
      return YAML.parse(fs.readFileSync(defaultPath, "utf-8"))
    }
    return { configuration: {}, plugins: [] }
  }
  return YAML.parse(fs.readFileSync(configPath, "utf-8"))
}

export function writePluginsJson(data) {
  fs.writeFileSync("quartz.config.yaml", YAML.stringify(data))
}

export function readLockfile() {
  if (!fs.existsSync(LOCKFILE_PATH)) return {}
  return JSON.parse(fs.readFileSync(LOCKFILE_PATH, "utf-8"))
}

export function writeLockfile(data) {
  fs.writeFileSync(LOCKFILE_PATH, JSON.stringify(data, null, 2))
}

export function extractPluginName(source) {
  if (typeof source === "object" && source.name) return source.name
  const repo = typeof source === "object" ? source.repo : source
  return parseGitSource(repo).name
}

export function parseGitSource(source) {
  if (source.startsWith("github:")) {
    const [, userRepo] = source.split("github:")
    const [user, repoAndRef] = userRepo.split("/")
    const [repo, ref] = (repoAndRef || "").split("#")
    return { user, name: repo, ref: ref || null, url: `https://github.com/${user}/${repo}.git` }
  }
  // Handle full URLs
  const match = source.match(/([^/]+)\.git(?:#(.+))?$/)
  if (match) {
    return { name: match[1], ref: match[2] || null, url: source.replace(/#.*$/, "") }
  }
  return { name: source, ref: null, url: source }
}

export function updateGlobalConfig(pluginName, options, remove = false) {
  const config = readPluginsJson()
  if (!config.plugins) config.plugins = []
  const idx = config.plugins.findIndex((p) => extractPluginName(p.source) === pluginName)
  if (remove) {
    if (idx !== -1) config.plugins.splice(idx, 1)
  } else {
    if (idx !== -1) {
      config.plugins[idx] = { ...config.plugins[idx], ...options }
    } else {
      config.plugins.push({ source: `github:quartz-community/${pluginName}`, enabled: true, ...options })
    }
  }
  writePluginsJson(config)
}

export function createConfigFromTemplate(templateName) {
  const templatePath = path.join(path.dirname(new URL(import.meta.url).pathname), "templates", `${templateName}.yaml`)
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template '${templateName}' not found`)
  }
  const content = fs.readFileSync(templatePath, "utf-8")
  fs.writeFileSync("quartz.config.yaml", content)
}

export function resolveLockfileName(source) {
  return extractPluginName(source)
}

export function getNameOverrides(source) {
  if (typeof source === "object" && source.name) return source.name
  return null
}
