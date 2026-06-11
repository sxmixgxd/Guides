import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((_opts?: undefined) => {
  function Header({ children }: QuartzComponentProps) {
    return children && children.length > 0 ? <header>{children}</header> : <></>
  }

  Header.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  flex: auto;
}
`
  return Header
}) satisfies QuartzComponentConstructor
