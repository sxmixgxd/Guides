import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { i18n } from "../../i18n"

export default ((_opts?: undefined) => {
  function NotFound({ cfg }: QuartzComponentProps) {
    const lang = i18n(cfg.locale)
    return (
      <article class="popover-hint">
        <h1>{lang.pages.error.title}</h1>
        <p>{lang.pages.error.notFound}</p>
        <a href="/">{lang.pages.error.home}</a>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          // Case-insensitive redirect for 404 pages
          const currentPath = window.location.pathname
          const allLinks = document.querySelectorAll('a[href]')
          // Try to find a case-insensitive match
          const possibleMatch = Array.from(allLinks).find(link => 
            link.href.toLowerCase() === window.location.href.toLowerCase() && 
            link.href !== window.location.href
          )
          if (possibleMatch) {
            window.location.replace(possibleMatch.href)
          }
        `,
          }}
        />
      </article>
    )
  }

  return NotFound
}) satisfies QuartzComponentConstructor
