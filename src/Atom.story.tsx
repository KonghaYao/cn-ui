import { atom, reflect } from '@cn-ui/use';
import { InputNumber, Space } from '@cn-ui/core';

export const Controller = [];
export default () => {
    const value = atom(0);
    const bg = reflect(() => {
        return `#${value() * 360}`;
    });
    return (
        <Space>
            <div
                class="h-4 w-4"
                style={{
                    'background-color': bg(),
                }}
            ></div>
            <InputNumber value={value}></InputNumber>
        </Space>
    );
};
