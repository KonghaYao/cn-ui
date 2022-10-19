import { atom, reflect } from '@cn-ui/use';
import { FormSwitch, Button } from '@cn-ui/core';
import { Form, registerFormComponent } from './Form';

export const Controller = [
    { type: 'switch', default: false, prop: 'disabled' },
    { type: 'switch', default: true, prop: 'showWordLimit' },
    { type: 'switch', default: true, prop: 'allowClear' },
];

export default (props) => {
    const val = atom<{}>({});
    registerFormComponent.set('switch', () => Promise.resolve({ default: FormSwitch }));
    return (
        <>
            <main class="m-4 flex flex-col overflow-hidden rounded-lg  shadow-md">
                <Form
                    template={[
                        { type: 'switch', default: false, prop: 'disabled' },
                        { type: 'switch', default: true, prop: 'showWordLimit' },
                        {
                            type: 'switch',
                            default: true,
                            prop: 'allowClear',
                            valid(value: boolean, total) {
                                console.log(value);
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
