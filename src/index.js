import React from "react";
import { render } from "react-dom";
import App from "./App";

// disable right click
document.oncontextmenu = function () {
    return false;
}

render(<App />, document.getElementById("root"));
