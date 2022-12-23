import { Button, Confirm, Message } from '@cn-ui/core';

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
    return (
        <>
            <div class="flex flex-wrap gap-2">Message 组件</div>
            <div class="flex flex-wrap gap-2">{Content}</div>
            <div class="flex flex-wrap gap-2">Dialog</div>
            <div class="flex flex-wrap gap-2">
                <Button
                    onClick={() => {
                        Confirm(
                            '这是一个 Confirm 信息',
                            '这里面是提示信息，为了防止用户看不到'
                        ).then((res) => {
                            console.log(res);
                        });
                    }}
                >
                    Confirm
                </Button>
            </div>
        </>
    );
};
