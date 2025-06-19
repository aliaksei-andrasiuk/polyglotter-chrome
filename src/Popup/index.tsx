import React from "react";
import { HashRouter as Router } from "react-router-dom";

import { createRoot } from "react-dom/client";
import '../assets/index.scss';
import App from "./Popup";

function init() {
    const appContainer = document.createElement('div');
    document.body.appendChild(appContainer);

    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }

    const root = createRoot(appContainer);

    root.render(<Router><App /></Router>);
}

init();