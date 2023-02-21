import { createSignal } from 'solid-js';

import { ColorButton, Icon, Button } from '@cn-ui/core';
export default () => {
    const [type, setType] = createSignal<'red' | 'green'>('red');
    const onClick = () => console.log('点击成功');
    console.log('刷新组件');
    return (
        <>
            <div class="flex  items-start gap-2 p-2">
                <Button size="sm">纯粹按钮</Button>
                <Button>纯粹按钮</Button>
                <Button size="lg">纯粹按钮</Button>
                <Button size="xl">纯粹按钮</Button>
            </div>
            <div class="flex  items-start gap-2 p-2">
                <Button gradient color="blue" size="sm">
                    渐变按钮
                </Button>
                <Button gradient color="amber">
                    渐变按钮
                </Button>
                <Button gradient color="emerald" size="lg">
                    渐变按钮
                </Button>
                <Button gradient color="rose" size="xl">
                    渐变按钮
                </Button>
            </div>
            <div class="flex  items-start gap-2 p-2">
                <Button onclick={onClick} color="indigo" size="sm">
                    颜色按钮
                </Button>
                <Button onclick={onClick} color="orange">
                    颜色按钮
                </Button>
                <Button onClick={onClick} color="emerald" size="lg">
                    颜色按钮
                </Button>
                <Button onClick={onClick} color="rose" size="xl">
                    颜色按钮
                </Button>
            </div>
            <div class="flex  items-start gap-2 p-2">
                <Button onclick={onClick} disabled color="indigo" size="sm">
                    失活组件
                </Button>
                <Button onclick={onClick} disabled color="orange">
                    失活组件
                </Button>
                <Button onClick={onClick} disabled color="emerald" size="lg">
                    失活组件
                </Button>
                <Button onClick={onClick} disabled color="rose" size="xl">
                    失活组件
                </Button>
            </div>
            <div class="flex  items-start gap-2 p-2">
                <Button text color="indigo" size="sm">
                    文本按钮
                </Button>
                <Button text color="orange">
                    文本按钮
                </Button>
                <Button text color="emerald" size="lg">
                    文本按钮
                </Button>
                <Button text color="rose" size="xl">
                    文本按钮
                </Button>
            </div>
            <div class="flex  items-start gap-2 p-2">
                <ColorButton round onclick={onClick} color="indigo" size="sm">
                    <Icon name="file_copy"></Icon>
                </ColorButton>
                <ColorButton round onclick={onClick} color="orange">
                    <Icon name="file_copy"></Icon>
                </ColorButton>
                <ColorButton round onClick={onClick} color="emerald" size="lg">
                    <Icon name="file_copy"></Icon>
                </ColorButton>
                <ColorButton round onClick={onClick} color="rose" size="xl">
                    <Icon name="file_copy"></Icon>
                </ColorButton>
            </div>
            <div class="flex  w-screen flex-wrap items-start gap-2 p-2">
                <ColorButton block color="indigo" size="sm">
                    <Icon name="file_copy"></Icon> 文本描述
                </ColorButton>
                <ColorButton block color="orange">
                    <Icon name="file_copy"></Icon>文本描述
                </ColorButton>
                <ColorButton block color="emerald" size="lg">
                    <Icon name="file_copy"></Icon>文本描述
                </ColorButton>
                <ColorButton block color="rose" size="xl">
                    <Icon name="file_copy"></Icon>文本描述
                </ColorButton>
            </div>
            <link
                href="https://cdn.jsdelivr.net/npm/@fontsource/material-icons-rounded/index.css"
                rel="stylesheet"
            ></link>
        </>
    );
};
