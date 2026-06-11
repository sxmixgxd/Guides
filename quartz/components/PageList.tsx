import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { JSX } from "preact/jsx-runtime"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    if (f1.dates && f2.dates) {
      const d1 = getDate(cfg, f1)
      const d2 = getDate(cfg, f2)
      if (d1 && d2) {
        return d2.getTime() - d1.getTime()
      }
    }
    if (f1.frontmatter?.title && f2.frontmatter?.title) {
      return f1.frontmatter.title.localeCompare(f2.frontmatter.title)
    }
    return 0
  }
}

export function byDateAndAlphabeticalFolderFirst(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    const f1IsFolder = f1.slug?.endsWith("/index") ?? false
    const f2IsFolder = f2.slug?.endsWith("/index") ?? false
    if (f1IsFolder && !f2IsFolder) return -1
    if (!f1IsFolder && f2IsFolder) return 1
    return byDateAndAlphabetical(cfg)(f1, f2)
  }
}

interface Props {
  pages: QuartzPluginData[]
  sort?: SortFn
  cfg: GlobalConfiguration
}

export function PageList({ cfg, pages, sort }: Props) {
  const sorter = sort ?? byDateAndAlphabetical(cfg)
  const sorted = [...pages].sort(sorter)
  return (
    <ul class="section-ul">
      {sorted.map((page) => {
        const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
        const tags = page.frontmatter?.tags ?? []
        const fileData = page
        return (
          <li class="section-li">
            <div class="section">
              {fileData.dates && (
                <p class="meta">
                  <Date date={getDate(cfg, fileData)!} locale={cfg.locale} />
                </p>
              )}
              <div class="desc">
                <h3>
                  <a href={resolveRelative(fileData.slug!, fileData.slug! as FullSlug)} class="internal">
                    {title}
                  </a>
                </h3>
              </div>
              <ul class="tags">
                {tags.map((tag) => (
                  <li>
                    <a
                      class="internal tag-link"
                      href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                    >
                      #{tag}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
