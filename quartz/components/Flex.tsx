import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export interface FlexConfig {
  components: ReturnType<QuartzComponentConstructor>[]
  direction?: "row" | "column"
  gap?: string
  wrap?: boolean
}

export default ((opts: FlexConfig) => {
  const { components, direction = "row", gap = "0", wrap = false } = opts

  function Flex(props: QuartzComponentProps) {
    return (
      <div
        style={`display: flex; flex-direction: ${direction}; gap: ${gap}; flex-wrap: ${wrap ? "wrap" : "nowrap"};`}
      >
        {components.map((Component, i) => (
          <Component key={i} {...props} />
        ))}
      </div>
    )
  }

  Flex.css = components.flatMap((c) => c.css ?? []).join("\n")
  Flex.afterDOMLoaded = components
    .flatMap((c) => c.afterDOMLoaded ?? [])
    .join("\n")
  Flex.beforeDOMLoaded = components
    .flatMap((c) => c.beforeDOMLoaded ?? [])
    .join("\n")

  return Flex
}) satisfies QuartzComponentConstructor
