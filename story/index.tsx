/* @refresh reload */
import './index.css';
import '@cn-ui/core/index.css';
import { render } from 'solid-js/web';

import { App } from './App';
import { Router, hashIntegration, Route, Routes } from '@solidjs/router';

render(() => {
    console.log('全局重绘');
    return (
        <Router source={hashIntegration()}>
            {/* <App></App> */}
            <Routes>
                <Route path="/path" element={App}></Route>
            </Routes>
        </Router>
    );
}, document.getElementById('root') as HTMLElement);
