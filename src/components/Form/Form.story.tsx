import { Atom, atom, reflect } from '@cn-ui/use';
import {
    FormSwitch,
    Button,
    FromSelect,
    Form,
    registerFormComponent,
    defineFormTemplate,
    FromRate,
    FromColor,
    FromText,
    FormNumber,
    FormSlider,
} from '@cn-ui/core';
import { FormRadio } from './CheckBox/FormWrap';

export const Controller = [
    { type: 'switch', default: false, prop: 'disabled' },
    { type: 'switch', default: true, prop: 'showWordLimit' },
    { type: 'switch', default: true, prop: 'allowClear' },
];

const template = defineFormTemplate([
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
        type: 'radio',
        default: 'auto',
        prop: 'radio',
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
    },
    {
        type: 'switch',
        default: true,
        prop: 'allowClear',
        valid(value: boolean, total) {
            return value !== false && 'It should be false';
        },
    },
    {
        type: 'color',
        default: '#000',
        prop: 'color',
    },
    {
        type: 'rate',
        default: 0,
        prop: 'rate',
    },
    {
        type: 'text',
        default: '',
        prop: 'text',
    },
    {
        type: 'range',
        default: 0,
        params: {
            min: -10,
            max: 100,
            step: 10,
        },
        prop: 'range',
    },
    {
        type: 'slider',
        default: 0,
        prop: 'slider',
        label: '滑动条',
    },
]);
export default (props) => {
    const val = atom<{
        [key: string]: Atom<unknown>;
    }>({});
    registerFormComponent.set('switch', () => Promise.resolve({ default: FormSwitch }));
    registerFormComponent.set('select', () => Promise.resolve({ default: FromSelect }));
    registerFormComponent.set('rate', () => Promise.resolve({ default: FromRate }));
    registerFormComponent.set('color', () => Promise.resolve({ default: FromColor }));
    registerFormComponent.set('text', () => Promise.resolve({ default: FromText }));
    registerFormComponent.set('range', () => Promise.resolve({ default: FormNumber }));
    registerFormComponent.set('slider', () => Promise.resolve({ default: FormSlider }));
    registerFormComponent.set('radio', () => Promise.resolve({ default: FormRadio }));
    return (
        <>
            <main class="m-4 flex flex-col overflow-hidden rounded-lg  shadow-md">
                <Form template={template} value={val}></Form>
                <Button
                    class="m-2"
                    onClick={() => {
                        console.log(
                            Object.fromEntries(Object.entries(val()).map((i) => [i[0], i[1]()]))
                        );
                    }}
                >
                    提交
                </Button>
            </main>
        </>
    );
};
