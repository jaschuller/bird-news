import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./styles/index.scss";

// Render the application into the document element with id "App"
ReactDOM.render(<App />, document.getElementById("App"));

// Hot Module Replacement
// This is not required, however it makes debugging super easy
// Rather than refresh the entire page on save, Hot Module Replacement lets you
// keep the state of the page and only update areas that have changed
// Therefore, if you are in something like a modal or multi step situation, you can
// update the code without losing the data in the UI, console logs, etc
if (module.hot) {
  module.hot.accept();
}
