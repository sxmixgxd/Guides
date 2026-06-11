import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((component) => {
  if (component) {
    const Component = component
    function DesktopOnly(props: QuartzComponentProps) {
      return (
        <div class="desktop-only">
          <Component {...props} />
        </div>
      )
    }
    DesktopOnly.css = Component.css
    DesktopOnly.afterDOMLoaded = Component.afterDOMLoaded
    DesktopOnly.beforeDOMLoaded = Component.beforeDOMLoaded
    DesktopOnly.displayName = `DesktopOnly(${Component.displayName})`
    return DesktopOnly
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
