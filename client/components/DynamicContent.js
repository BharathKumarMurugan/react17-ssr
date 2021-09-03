import React, { useState } from "react";
import './app.css';

function DynamicComponent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h4>This is from dynamic component</h4>
      <button className="button counterbtn" onClick={() => setCount(count + 1)}>
        You clicked {count} time{count>1?'s':null}
      </button>
    </>
  );
}

export default DynamicComponent;
