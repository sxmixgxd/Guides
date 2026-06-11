import { GlobalConfiguration } from "../cfg"
import { ValidLocale } from "../i18n"

interface Props {
  date: Date
  locale?: ValidLocale
}

export function getDate(cfg: GlobalConfiguration, data: { dates?: { [key: string]: Date } }): Date | undefined {
  if (!cfg.defaultDateType) return undefined
  return data.dates?.[cfg.defaultDateType]
}

export function formatDate(d: Date, locale: ValidLocale = "en-US"): string {
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export default function DateComponent({ date, locale }: Props) {
  return <>{formatDate(date, locale)}</>
}
