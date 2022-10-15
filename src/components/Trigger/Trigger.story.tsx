import { atom } from '@cn-ui/use';
import { createTrigger, Button, Space, Message } from '@cn-ui/core';
export const Controller = [];

export default (props) => {
    const visible = atom(false);
    const disabled = atom(false);
    return (
        <Space wrap>
            <Button
                ref={createTrigger({
                    content: (
                        <Space>
                            <div>Inner1</div>
                            <div>Inner</div>
                        </Space>
                    ),
                    trigger: 'mouseenter click',
                    visible,
                    disabled,
                })}
            >
                hover
            </Button>
            <Button
                onClick={() => {
                    visible((i) => !i);
                }}
            >
                {visible() ? 'showing' : 'hiding'}
            </Button>
            <Button
                onClick={() => {
                    disabled((i) => !i);
                    console.log('点击');
                }}
            >
                {disabled() ? 'disabled' : 'enable'}
            </Button>

            <Button
                ref={createTrigger({
                    interactive: true,
                    content: (
                        <div>
                            <Button
                                text
                                onClick={() => {
                                    Message.init();
                                    Message.success('点击成功');
                                }}
                            >
                                可以点击
                            </Button>
                        </div>
                    ),
                    trigger: 'mouseenter click',
                })}
                block
            >
                可交互点击层
            </Button>
        </Space>
    );
};
