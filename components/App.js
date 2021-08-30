import React, { Fragment, useState } from "react"
import loadable from '@loadable/component'
const DynamicContent = loadable(() => import('./DynamicContent'), { ssr: true })
import "../styles.css"
const App = () => {
   const [showComponent, setShowComponent] = useState(false)
   const onClickHandler = () => {
      setShowComponent(!showComponent)
   }
   return <Fragment>
      <button onClick={onClickHandler}>Load Component</button>
      {showComponent ? <DynamicContent></DynamicContent> : null}
   </Fragment>
}
export default App