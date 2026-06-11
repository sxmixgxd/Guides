import { JSX } from "preact/jsx-runtime"

export interface PageFrameProps {
  head?: JSX.Element
  header?: JSX.Element[]
  beforeBody?: JSX.Element[]
  left?: JSX.Element[]
  right?: JSX.Element[]
  body?: JSX.Element
  afterBody?: JSX.Element[]
  footer?: JSX.Element
}

export type PageFrame = (props: PageFrameProps) => JSX.Element
