import { Divider, StyleDivider, Space } from '@cn-ui/core';

export default (props) => {
    return (
        <Space vertical={!props.vertical} class="h-64 w-full">
            <Divider {...props}></Divider>
            <Divider {...props}>文本测试</Divider>
            <StyleDivider {...props}></StyleDivider>
        </Space>
    );
};
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'vertical',
        refresh: true,
    },
];
