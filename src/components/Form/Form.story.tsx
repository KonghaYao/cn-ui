import { atom, reflect } from '@cn-ui/use';
import { FormSwitch, Switch } from '@cn-ui/core';
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
            <Form
                template={[
                    { type: 'switch', default: false, prop: 'disabled' },
                    { type: 'switch', default: true, prop: 'showWordLimit' },
                    { type: 'switch', default: true, prop: 'allowClear' },
                ]}
                value={val}
            ></Form>
        </>
    );
};
