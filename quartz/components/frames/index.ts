import { PageFrame } from "./types"
import DefaultFrame from "./DefaultFrame"
import FullWidthFrame from "./FullWidthFrame"
import MinimalFrame from "./MinimalFrame"
import { frameRegistry } from "./registry"

export const builtinFrames: Record<string, PageFrame> = {
  default: DefaultFrame,
  "full-width": FullWidthFrame,
  minimal: MinimalFrame,
}

export function resolveFrame(name: string): PageFrame {
  // Check plugin-provided frames first
  try {
    return frameRegistry.get(name)
  } catch {
    // Fall back to builtin frames
  }

  const frame = builtinFrames[name]
  if (!frame) {
    throw new Error(
      `Frame '${name}' not found. Available frames: ${Object.keys(builtinFrames).join(", ")}`,
    )
  }
  return frame
}

export { frameRegistry } from "./registry"
export type { PageFrame, PageFrameProps } from "./types"
