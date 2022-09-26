import { atom } from 'solid-use';
import { Collapse, CollapseItem } from './index';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'accordion',
    },
    {
        type: 'switch',
        default: false,
        prop: 'destroyOnHide',
    },
    {
        type: 'switch',
        default: false,
        prop: 'lazyload',
    },
    {
        type: 'select',
        default: 'square',
        prop: 'shape',
        options: ['square', 'circle', 'round'].map((i) => ({ value: i })),
    },
];
export default (props) => {
    const Value = atom(false);
    return (
        <>
            <button onclick={() => Value(!Value())}>受控标签: {Value() ? 'truee' : 'ffe'}</button>
            <Collapse
                activeKey={[]}
                {...props}
                onChange={(...args) => {
                    console.log(args);
                }}
            >
                <CollapseItem header="47834738" name="1">
                    <div>Content</div>
                    <div>Content</div>
                    <div>Content</div>
                    <div>Content</div>
                    <div>Content</div>
                </CollapseItem>
                <CollapseItem header="47834738" value={Value} name="2">
                    <div>Content</div>
                </CollapseItem>
                <CollapseItem header="47834738" name="3">
                    <div>Content</div>
                </CollapseItem>
                <CollapseItem header="47834738" name="4">
                    <div>Content</div>
                </CollapseItem>
            </Collapse>
        </>
    );
};
