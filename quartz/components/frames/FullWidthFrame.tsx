import { PageFrame, PageFrameProps } from "./types"
import { JSX } from "preact/jsx-runtime"

const FullWidthFrame: PageFrame = ({
  head,
  header,
  beforeBody,
  body,
  afterBody,
  footer,
}: PageFrameProps): JSX.Element => {
  return (
    <>
      {head}
      <div id="quartz-root">
        <div id="quartz-body" class="full-width">
          <div class="center">
            <div class="page-header">{header}</div>
            <article id="quartz-content">
              {beforeBody && <div class="before-body">{beforeBody}</div>}
              {body}
              {afterBody && <div class="after-body">{afterBody}</div>}
            </article>
          </div>
        </div>
        <footer id="quartz-footer">{footer}</footer>
      </div>
    </>
  )
}

export default FullWidthFrame
