import { QuartzComponentConstructor } from "./types"

export default ((_opts?: undefined) => {
  function Spacer() {
    return <div class="spacer"></div>
  }
  return Spacer
}) satisfies QuartzComponentConstructor
