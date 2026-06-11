import path from "path"
import { PerfTimer } from "./util/perf"
import { getStaticResourcesFromPlugins } from "./plugins/index"
import { QuartzConfig } from "./cfg"
import { BuildCtx } from "./util/ctx"
import { emitContent } from "./processors/emit"
import { filterContent } from "./processors/filter"
import { parseMarkdown } from "./processors/parse"
import { QuartzLogger } from "./util/log"
import { glob } from "./util/glob"
import { trace } from "./util/trace"
import { getFullSlug } from "./util/path"
import { detectSlugCollisions, formatCollisionWarning } from "./util/slugCollisions"
import { styleText } from "util"

export async function buildQuartz(
  argv: {
    directory: string
    verbose: boolean
    output: string
    serve: boolean
    baseUrl?: string
    concurrency?: number
  },
  cfg: QuartzConfig,
  clientRefresh: () => void,
) {
  const perf = new PerfTimer()
  const output = argv.output

  const pluginCount = Object.values(cfg.plugins).flat().length
  const pluginNames = (key: "transformers" | "filters" | "emitters") =>
    cfg.plugins[key].map((p) => p.name)

  if (argv.verbose) {
    console.log(`Loaded ${pluginCount} plugins`)
    console.log(`Transformers: ${pluginNames("transformers").join(", ")}`)
    console.log(`Filters: ${pluginNames("filters").join(", ")}`)
    console.log(`Emitters: ${pluginNames("emitters").join(", ")}`)
  }

  const logger = new QuartzLogger(argv.verbose)

  // glob all files
  logger.start("Globbing files")
  const allFiles = await glob("**/*.*", argv.directory, cfg.configuration.ignorePatterns)
  const fps = allFiles.filter((fp) => fp.endsWith(".md")).sort()
  logger.end(`Found ${fps.length} input files from ${argv.directory} in ${perf.timeSince()}`)

  const filePaths = fps.map((fp) => path.join(argv.directory, fp))
  const ctx: BuildCtx = {
    argv,
    cfg,
    allFiles,
  }

  logger.start("Parsing and transforming documents")
  let parsedFiles = await parseMarkdown(ctx, filePaths)
  logger.end(`Parsed ${parsedFiles.length} Markdown files in ${perf.timeSince()}`)

  // detect and warn about slug collisions
  const collisions = detectSlugCollisions(parsedFiles)
  if (collisions.length > 0) {
    const warning = formatCollisionWarning(collisions)
    console.warn(styleText("yellow", warning))
  }

  logger.start("Filtering content")
  const filteredContent = filterContent(ctx, parsedFiles)
  logger.end(`Retained ${filteredContent.length} files after filtering in ${perf.timeSince()}`)

  logger.start("Emitting output files")
  const emittedFiles = await emitContent(ctx, filteredContent)
  logger.end(
    `Emitted ${emittedFiles} files to \`${output}\` in ${perf.timeSince()}`,
  )

  console.log(styleText("green", `Done processing ${fps.length} files in ${perf.timeSince("start")}`))
  clientRefresh()
}
