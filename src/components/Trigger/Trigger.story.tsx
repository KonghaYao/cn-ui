import { Component, onCleanup, onMount } from 'solid-js';
import { atom } from '@cn-ui/use';
import { createTrigger, Button, Space } from '@cn-ui/core';
export const Controller = [];

export default (props) => {
    // 注意，这个函数的环境作用域必须在这里面才行
    const Comp: Component = () => {
        onMount(() => {
            console.log('初始化');
        });
        onCleanup(() => {
            console.log('被清理');
        });
        return (
            <Space>
                <div>Inner1</div>
                <div>Inner</div>
            </Space>
        );
    };
    const visible = atom(false);
    const disabled = atom(false);
    return (
        <Space>
            <Button
                ref={createTrigger({
                    content: <Comp></Comp>,
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
        </Space>
    );
};
