import { Theme } from "./util/theme"
import { ValidLocale } from "./i18n"
import { QuartzTransformerPlugin } from "./plugins/types"
import { QuartzFilterPlugin } from "./plugins/types"
import { QuartzEmitterPlugin } from "./plugins/types"

export interface GlobalConfiguration {
  pageTitle: string
  pageTitleSuffix?: string
  enableSPA: boolean
  enablePopovers: boolean
  analytics?:
    | {
        provider: "plausible"
        host?: string
      }
    | {
        provider: "google"
        tagId: string
      }
    | {
        provider: "umami"
        websiteId: string
        host?: string
      }
    | {
        provider: "goatcounter"
        websiteId: string
        host?: string
      }
    | {
        provider: "posthog"
        apiKey: string
        host?: string
      }
    | {
        provider: "tinylytics"
        siteId: string
      }
    | {
        provider: "cabin"
      }
    | {
        provider: "clarity"
        projectId: string
      }
    | {
        provider: "none"
      }
  locale: ValidLocale
  baseUrl?: string
  ignorePatterns: string[]
  defaultDateType: "created" | "modified" | "published"
  generateSocialImages?: boolean | SocialImageOptions
  theme: Theme
}

export interface SocialImageOptions {
  colorScheme?: "lightMode" | "darkMode"
  width?: number
  height?: number
  excludeRoot?: boolean
}

export interface QuartzConfig {
  configuration: GlobalConfiguration
  plugins: {
    transformers: QuartzTransformerPlugin[]
    filters: QuartzFilterPlugin[]
    emitters: QuartzEmitterPlugin[]
  }
}
