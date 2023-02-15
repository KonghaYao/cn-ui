import { Button, Confirm, Message, OutSpace } from '@cn-ui/core';

//! 必须先注册

export const Controller = [];
export default (props) => {
    Message.init();
    Message.success('完成操作');
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
            {/*  需要在 DOM 中注册 OutSpace */}
            {OutSpace.init()}
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
