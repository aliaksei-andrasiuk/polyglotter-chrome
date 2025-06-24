import React from 'react';
import { HashRouter as Router } from 'react-router';

import { createRoot } from 'react-dom/client';
import '../assets/index.scss';
import App from './Popup';
import { theme } from '../ui';
import { ThemeProvider } from '@mui/material';

function init() {
    const appContainer = document.createElement('div');
    document.body.appendChild(appContainer);

    if (!appContainer) {
        throw new Error('Can not find AppContainer');
    }

    const root = createRoot(appContainer);

    root.render(
        <Router>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Router>
    );
}

init();
