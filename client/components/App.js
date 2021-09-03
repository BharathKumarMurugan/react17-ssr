import React, { Fragment, useState } from "react";
import loadable from "@loadable/component";
const DynamicComponent = loadable(() => import("./DynamicComponent"), {
  ssr: false,
});
import "./app.css";

function App() {
  const [showComponent, setShowComponent] = useState(false);
  return (
    <Fragment>
      <h3>This is from App Component</h3>
      <button
        className="button"
        onClick={() => setShowComponent(!showComponent)}
      >
        Click to load Dynamic Component
      </button>
      {showComponent ? <DynamicComponent /> : null}
    </Fragment>
  );
}

export default App;
