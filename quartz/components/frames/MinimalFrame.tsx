import { PageFrame, PageFrameProps } from "./types"
import { JSX } from "preact/jsx-runtime"

const MinimalFrame: PageFrame = ({ head, body, footer }: PageFrameProps): JSX.Element => {
  return (
    <>
      {head}
      <div id="quartz-root">
        <div id="quartz-body" class="minimal">
          <article id="quartz-content">{body}</article>
        </div>
        <footer id="quartz-footer">{footer}</footer>
      </div>
    </>
  )
}

export default MinimalFrame
