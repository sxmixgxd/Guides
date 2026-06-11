import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((component) => {
  if (component) {
    const Component = component
    function MobileOnly(props: QuartzComponentProps) {
      return (
        <div class="mobile-only">
          <Component {...props} />
        </div>
      )
    }
    MobileOnly.css = Component.css
    MobileOnly.afterDOMLoaded = Component.afterDOMLoaded
    MobileOnly.beforeDOMLoaded = Component.beforeDOMLoaded
    MobileOnly.displayName = `MobileOnly(${Component.displayName})`
    return MobileOnly
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
