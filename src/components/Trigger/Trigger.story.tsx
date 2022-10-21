import { atom } from '@cn-ui/use';
import { Button, Space, Message, Trigger } from '@cn-ui/core';
export const Controller = [];

export default (props) => {
    const visible = atom(false);
    const disabled = atom(false);
    return (
        <Space wrap>
            <Trigger
                {...{ visible, disabled }}
                trigger="mouseenter click"
                content={
                    <Space>
                        <div>Inner1</div>
                        <div>Inner</div>
                    </Space>
                }
            >
                <Button>hover</Button>
            </Trigger>
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

            <Trigger
                content={
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
                }
                interactive
                trigger="mouseenter click"
            >
                <Button block>可交互点击层</Button>
            </Trigger>
        </Space>
    );
};
