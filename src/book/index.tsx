import { render } from 'solid-js/web';

import './index.css';

// 加载基础样式表
import '@cn-ui/core/dist/style.css';

import { Book } from './Book';
render(() => {
    return (
        <div>
            <Book></Book>
        </div>
    );
}, document.getElementById('root'));
