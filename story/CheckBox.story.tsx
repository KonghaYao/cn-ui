import { atom, reflect } from '@cn-ui/use';
import { Message, CheckBox, CheckGroup, Button, CheckGroupHelper } from '@cn-ui/core';
import { For } from 'solid-js';
export const Controller = [
    {
        type: 'switch',
        default: true,
        prop: 'multi',
    },
    {
        type: 'switch',
        default: false,
        prop: 'disabled',
    },
    {
        type: 'switch',
        default: false,
        prop: 'indeterminate',
    },
];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });

export default (props) => {
    const checkbox = atom(true);
    const groupController = ['用户', '姓名', '操作'].map((i) => {
        return { value: atom(false), disabled: props.disabled, children: i };
    });
    // const { inverse } = useCheckGroup(groupController);
    const selectedIds = atom<string[]>([]);
    return (
        <>
            <CheckGroup activeIds={selectedIds}>
                <CheckBox label="同步更新" value={checkbox} {...props}></CheckBox>
                <CheckBox
                    label="异步更新"
                    value={checkbox}
                    onValueInput={async () => {
                        console.log('请等待 1000s');
                        const c = Message.loading('加载中');
                        await sleep(1000);
                        c();
                        Message.success('成功');
                        return true;
                    }}
                >
                    {checkbox() ? '选中' : '没选中'}
                </CheckBox>
            </CheckGroup>

            <CheckGroup multi={props.multi}>
                <div class="flex gap-2">
                    <For each={groupController}>
                        {(item) => {
                            return <CheckBox label={item.children} value={item.value}></CheckBox>;
                        }}
                    </For>
                </div>
                <CheckGroupHelper>
                    {({ inverse, setAll, activeIds, allRegistered }) => {
                        return (
                            <div class="flex gap-2">
                                <Button onClick={inverse} size="mini">
                                    反选
                                </Button>
                                <Button
                                    onClick={() => {
                                        setAll(activeIds().size === 0);
                                    }}
                                    size="mini"
                                >
                                    {activeIds().size !== allRegistered().size ? '全选' : '全取消'}
                                </Button>
                            </div>
                        );
                    }}
                </CheckGroupHelper>
            </CheckGroup>
        </>
    );
};
