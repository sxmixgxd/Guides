import { PageFrame, PageFrameProps } from "./types"
import { JSX } from "preact/jsx-runtime"

const DefaultFrame: PageFrame = ({
  head,
  header,
  beforeBody,
  left,
  right,
  body,
  afterBody,
  footer,
}: PageFrameProps): JSX.Element => {
  return (
    <>
      {head}
      <div id="quartz-root">
        <div id="quartz-body">
          {left && left.length > 0 && (
            <aside id="quartz-sidebar-left" class="sidebar left">
              {left}
            </aside>
          )}
          <div class="center">
            <div class="page-header">{header}</div>
            <article id="quartz-content">
              {beforeBody && <div class="before-body">{beforeBody}</div>}
              {body}
              {afterBody && <div class="after-body">{afterBody}</div>}
            </article>
          </div>
          {right && right.length > 0 && (
            <aside id="quartz-sidebar-right" class="sidebar right">
              {right}
            </aside>
          )}
        </div>
        <footer id="quartz-footer">{footer}</footer>
      </div>
    </>
  )
}

export default DefaultFrame
