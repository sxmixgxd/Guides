import { QuartzComponent } from "./types"

/**
 * Registry for components provided by plugins.
 * Plugins register their components here, and other parts of the system
 * can retrieve them by name.
 */
export class ComponentRegistry {
  private components: Map<string, QuartzComponent> = new Map()

  register(name: string, component: QuartzComponent): void {
    if (this.components.has(name)) {
      console.warn(`Component '${name}' is already registered. Overwriting.`)
    }
    this.components.set(name, component)
  }

  get(name: string): QuartzComponent {
    const component = this.components.get(name)
    if (!component) {
      throw new Error(`Component '${name}' not found in registry`)
    }
    return component
  }

  instantiate(name: string, opts?: unknown): ReturnType<QuartzComponent> {
    const component = this.get(name)
    if (typeof component === "function") {
      return (component as any)(opts)
    }
    return component as any
  }

  getAllComponents(): Map<string, QuartzComponent> {
    return new Map(this.components)
  }
}

export const componentRegistry = new ComponentRegistry()
