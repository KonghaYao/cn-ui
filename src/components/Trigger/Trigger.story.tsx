import { Component, For, onCleanup, onMount } from 'solid-js';
import { atom } from '../_util/atom';
import { createTrigger, Trigger } from '.';
import { Button } from '../Button';
import { Space } from '../Space';
export const Controller = [];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
export default (props) => {
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
    return (
        <Space>
            <Button
                ref={createTrigger({
                    content: Comp,
                    trigger: 'mouseenter click',
                    visible,
                })}
            >
                hover
            </Button>
            <Button
                onClick={() => {
                    console.log('点击事件');
                    visible((i) => !i);
                }}
            >
                click
            </Button>
        </Space>
    );
};
