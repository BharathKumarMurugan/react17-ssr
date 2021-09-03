import React from "react";
import { hydrate } from "react-dom";
import App from "./components/App";
import "../common/css/styles.css";

hydrate(<App />, document.getElementById("root"));
