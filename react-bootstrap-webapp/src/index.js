// @flow
'use strict';

import React from "react";
import ReactDOM from "react-dom";
import Hello from "./Hello.js";

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById("content");
    ReactDOM.render((<Hello name="World"/>), content);
});
