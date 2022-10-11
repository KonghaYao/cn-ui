import { Button, Message } from '@cn-ui/core';

//! 必须先注册

Message.init();
export const Controller = [];
export default (props) => {
    const Content = ['info', 'success', 'warning', 'error', 'normal', 'loading'].map((i) => {
        return (
            <Button
                onClick={() => {
                    const close = Message[i]({
                        id: Math.random().toString(),
                        content: '这是一条信息',
                        closable: true,
                        duration: 0,
                    });
                }}
            >
                {i}
            </Button>
        );
    });
    return <>{Content}</>;
};
