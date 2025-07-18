import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assets/index.scss';

import ContentScript from './contentScript';

function init() {
    const appContainer = document.createElement('react-extension-root');

    document.body.appendChild(appContainer);

    if (!appContainer) {
        throw new Error('Can not find AppContainer');
    }

    const root = createRoot(appContainer);

    root.render(<ContentScript />);
}

init();
