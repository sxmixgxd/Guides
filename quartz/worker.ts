import { createFileParser, createMarkdownParser } from "./processors/parse"
import { WorkerSerializableBuildCtx } from "./util/ctx"

export async function parseMarkdown(ctx: WorkerSerializableBuildCtx, fps: string[]) {
  const parser = createFileParser(ctx, fps)
  return parser()
}

export async function processHtml(ctx: WorkerSerializableBuildCtx, fps: string[]) {
  const parser = createMarkdownParser(ctx, fps)
  return parser()
}
