import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './src/app';
import store from './src/app/store'
import ScrollToTop from './src/components/ui/scroll-to-top';
import Wrapper from './src/hoc/wrapper';
import * as serviceWorker from './src/serviceWorker';

import '../css/app.css'

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop />
            <Wrapper>
                <App />
            </Wrapper>
        </BrowserRouter>
    </Provider>
);

createRoot(document.getElementById('app')!).render(app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
