import { intro, outro, select, text, confirm, isCancel } from "@clack/prompts"
import { spawnSync, spawn } from "child_process"
import { createWriteStream } from "fs"
import { cp, symlink, access } from "fs/promises"
import fs from "fs"
import path from "path"
import os from "os"

export function escapePath(fp) {
  return fp
    .replace(/ /g, "\\ ")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/'/g, "\\'")
    .replace(/[^a-zA-Z0-9-./:_\\ ()']/g, "")
}

export function exitIfCancel(val) {
  if (isCancel(val)) {
    outro("Exiting...")
    process.exit(0)
  } else {
    return val
  }
}

export async function stashContentFolder(contentFolder) {
  await cp(contentFolder, `${contentFolder}_tmp`, { recursive: true, force: true })
  await fs.promises.rm(contentFolder, { recursive: true, force: true })
}

export async function gitPull(origin, branch) {
  const out = spawnSync("git", ["pull", origin, branch], { stdio: "pipe" })
  return out
}

export async function popContentFolder(contentFolder) {
  await fs.promises.rm(contentFolder, { recursive: true, force: true })
  await cp(`${contentFolder}_tmp`, contentFolder, { recursive: true, force: true })
  await fs.promises.rm(`${contentFolder}_tmp`, { recursive: true, force: true })
}

export function symlinkOrCopySync(originalFolder, targetFolder) {
  // Only run on posix systems. On Windows, fallback to copy
  if (os.platform() === "win32") {
    fs.cpSync(originalFolder, targetFolder, { recursive: true })
  } else {
    fs.symlinkSync(originalFolder, targetFolder, "dir")
  }
}

export async function symlinkOrCopy(originalFolder, targetFolder) {
  // Only run on posix systems. On Windows, fallback to copy
  if (os.platform() === "win32") {
    await cp(originalFolder, targetFolder, { recursive: true })
  } else {
    await symlink(originalFolder, targetFolder, "dir")
  }
}
