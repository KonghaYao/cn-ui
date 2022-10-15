import { atom, reflect } from '@cn-ui/use';
import { InputText, Button, Icon, Space } from '@cn-ui/core';

export const Controller = [
    { type: 'switch', default: false, prop: 'disabled' },
    { type: 'switch', default: true, prop: 'showWordLimit' },
    { type: 'switch', default: true, prop: 'allowClear' },
];
export default (props) => {
    const val = atom('');
    return (
        <Space vertical class="m-4">
            <InputText {...props}></InputText>
            <InputText {...props} maxLength={10} value={val}></InputText>
            <InputText
                {...props}
                value={val}
                allowClear={false}
                icon={'https://'}
                showWordLimit={false}
            >
                <Button size="mini" color="blue">
                    <Icon name="search"></Icon>
                </Button>
            </InputText>
        </Space>
    );
};
