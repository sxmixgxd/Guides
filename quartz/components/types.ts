import { StaticResources } from "../util/resources"
import { QuartzPluginData } from "../plugins/vfile"
import { GlobalConfiguration } from "../cfg"
import { Node } from "hast"
import { BuildCtx } from "../util/ctx"
import { JSX } from "preact/jsx-runtime"

export interface QuartzComponentProps {
  ctx: BuildCtx
  externalResources: StaticResources
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  children: (JSX.Element | undefined | null)[]
  tree: Node
  allFiles: QuartzPluginData[]
  displayClass?: "mobile-only" | "desktop-only"
}

export type QuartzComponent = ((props: QuartzComponentProps) => JSX.Element | null) & {
  css?: string
  beforeDOMLoaded?: string
  afterDOMLoaded?: string
  displayName?: string
}

export type QuartzComponentConstructor<Options = undefined> = (
  opts: Options,
) => QuartzComponent
