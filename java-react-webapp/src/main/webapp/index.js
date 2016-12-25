// @flow
"use strict";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    ReactDOM.render((<App />), content);
});
