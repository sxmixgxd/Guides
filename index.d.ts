export {}

declare global {
  interface Window {
    spaNavigate: (url: URL, isBack?: boolean) => Promise<void>
    addCleanup: (fn: (...args: unknown[]) => void) => void
    getTheme: () => "light" | "dark"
  }
}
