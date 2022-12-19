export const Controller = [];

import { atom } from '@cn-ui/use';
import { DragPoster, DropReceiver } from '@cn-ui/headless';
import { Button, Message } from '@cn-ui/core';
import { debounce, throttle } from 'lodash-es';
Message.init();
export default (props) => {
    const count = atom(0);
    // 不能写在 JSX 里面，会无限重绘
    const notice = throttle(() => {
        Message.success('拖拽到这里了');
    }, 3000);
    return (
        <>
            <DragPoster send={(send) => send('DEFAULT', '传递的信息')}>
                <Button>这是信息</Button>
            </DragPoster>
            <DropReceiver
                detect={{
                    DEFAULT: notice,
                }}
                receive={{
                    DEFAULT(data) {
                        count((i) => i + 1);
                    },
                }}
            >
                <Button>拖拽到这里 {count()}</Button>
            </DropReceiver>
        </>
    );
};
