import { atom, reflect } from '@cn-ui/use';
import { FormSwitch, Button } from '@cn-ui/core';
import { Form, FormTemplate, registerFormComponent } from './Form';
import { FromSelect } from './Select/FormWrap';

export const Controller = [
    { type: 'switch', default: false, prop: 'disabled' },
    { type: 'switch', default: true, prop: 'showWordLimit' },
    { type: 'switch', default: true, prop: 'allowClear' },
];
export default (props) => {
    const val = atom<{}>({});
    registerFormComponent.set('switch', () => Promise.resolve({ default: FormSwitch }));
    registerFormComponent.set('select', () => Promise.resolve({ default: FromSelect }));
    return (
        <>
            <main class="m-4 flex flex-col overflow-hidden rounded-lg  shadow-md">
                <Form
                    template={[
                        { type: 'switch', default: false, prop: 'disabled' },
                        {
                            type: 'select',
                            default: 'auto',
                            prop: 'language',
                            options: [
                                {
                                    label: '中文',
                                    value: 'zh-cn',
                                },
                                {
                                    label: '英文',
                                    value: 'en',
                                },
                                {
                                    label: '默认',
                                    value: 'auto',
                                },
                            ],
                            valid(value) {
                                console.log(value);
                                return value.value === 'auto' && '请选中一种语言';
                            },
                        },
                        {
                            type: 'switch',
                            default: true,
                            prop: 'allowClear',
                            valid(value: boolean, total) {
                                return value !== false && 'It should be false';
                            },
                        },
                    ]}
                    value={val}
                ></Form>
                <Button class="m-2">提交</Button>
            </main>
        </>
    );
};
