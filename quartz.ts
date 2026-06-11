import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/index"

export async function buildConfig() {
  const { cfg, layout } = await loadQuartzConfig()
  return { cfg, layout }
}

export { loadQuartzConfig, loadQuartzLayout }
