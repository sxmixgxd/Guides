import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface ConditionalRenderOptions {
  condition: (props: QuartzComponentProps) => boolean
  component: ReturnType<QuartzComponentConstructor>
}

export default ((opts: ConditionalRenderOptions) => {
  const { condition, component: Component } = opts
  function ConditionalRender(props: QuartzComponentProps) {
    return condition(props) ? <Component {...props} /> : null
  }
  return ConditionalRender
}) satisfies QuartzComponentConstructor
