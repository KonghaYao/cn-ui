import { Collapse, CollapseItem } from './index';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'loading',
    },
    {
        type: 'select',
        default: 'square',
        prop: 'shape',
        options: ['square', 'circle', 'round'].map((i) => ({ value: i })),
    },
];
export default (props) => {
    return (
        <>
            <Collapse activeKey={[]} accordion>
                <CollapseItem header="47834738" destroyOnHide name="1">
                    <div>Content</div>
                </CollapseItem>
                <CollapseItem header="47834738" name="2">
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
