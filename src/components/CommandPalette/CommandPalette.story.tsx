import { atom, reflect } from '@cn-ui/use';
import { For, onCleanup, onMount } from 'solid-js';
import '@cn-ui/command-palette/pkg-dist/style.css';
import { CommandPalette, PaletteRoot, Action, defineAction } from '@cn-ui/command-palette';
import {
    useKeyWordsFilter,
    Button,
    CheckGroup,
    Image,
    Message,
    Space,
    CheckBox,
} from '@cn-ui/core';
export const Controller = [];

const initActions = [
    {
        id: 'message-info',
        title: '发出提示',
        subtitle: 'fjiefjeijeif',
        keywords: ['Message', 'web detection', 'another'],
        icon: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        run() {
            Message.info('来自 Command Palette');
        },
    },
    {
        id: 'command',
        title: '关闭',
        subtitle: '反对反对的',
        keywords: ['command', 'it is awesome'],
        run() {
            Message.info('关闭');
        },
    },
];

export default (props) => {
    const actionSource = atom<any>(initActions);
    const actions = reflect<Action[]>(() => actionSource().map((i) => defineAction(i)));
    const visible = atom(true);

    onMount(() => {
        // I want to add some actions after mount!
        actionSource((i) => [
            ...i,
            {
                id: 'hide',
                title: 'Toggle Message KeyWords',
                subtitle: 'Click Me',
                keywords: ['Message'],
                run() {
                    return true;
                },
            },
        ]);
    });

    // Helpful filter automatically generated by actions!

    const { keywordsFilter, keywords } = useKeyWordsFilter(actions);
    const components = {
        // define the Icon on the left of every
        ResultIcon({ action }) {
            return (
                <Image
                    src={(action as any).icon}
                    class="mr-4 h-10 w-10 overflow-hidden rounded-lg"
                ></Image>
            );
        },
        // It will add a Tag Select Bar between search box and result list
        Main() {
            return (
                <Space class="px-2">
                    <CheckGroup>
                        <div class="flex gap-2 overflow-scroll px-2 py-1">
                            <For each={keywords()}>
                                {(item) => {
                                    return (
                                        <CheckBox
                                            value={item.value}
                                            label={item.children}
                                        ></CheckBox>
                                    );
                                }}
                            </For>
                        </div>
                    </CheckGroup>
                </Space>
            );
        },
    };

    return (
        <div>
            <PaletteRoot
                filters={[keywordsFilter]}
                visibility={visible}
                actions={actions}
                actionsContext={{}}
                components={components}
            >
                <CommandPalette></CommandPalette>
            </PaletteRoot>
            {/* Control the reactive visible easier */}
            <Button onClick={() => visible((i) => !i)}>{visible() ? '打开' : '关闭'}</Button>
        </div>
    );
};
