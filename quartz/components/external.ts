import { componentRegistry } from "./registry"
import { QuartzComponent } from "./types"

/**
 * Load a component from the component registry by name.
 * Used by plugins to reference components they provide.
 */
export function External(name: string): QuartzComponent {
  return componentRegistry.get(name)
}
