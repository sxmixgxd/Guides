import { PageFrame } from "./types"

/**
 * Registry for page frames provided by plugins.
 */
export class FrameRegistry {
  private frames: Map<string, PageFrame> = new Map()

  register(name: string, frame: PageFrame): void {
    if (this.frames.has(name)) {
      console.warn(`Frame '${name}' is already registered. Overwriting.`)
    }
    this.frames.set(name, frame)
  }

  get(name: string): PageFrame {
    const frame = this.frames.get(name)
    if (!frame) {
      throw new Error(`Frame '${name}' not found in registry`)
    }
    return frame
  }

  getAllFrames(): Map<string, PageFrame> {
    return new Map(this.frames)
  }
}

export const frameRegistry = new FrameRegistry()
