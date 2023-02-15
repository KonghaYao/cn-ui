import { atom, reflect } from '@cn-ui/use';
import { InputNumber, Space } from '@cn-ui/core';
import { useBreakpoints } from '@cn-ui/use';

export const Controller = [];
export default () => {
    const value = atom(0);
    const bg = reflect(() => {
        return `hsl(${value() % 360}deg 61% 31%)`;
    });
    const { size } = useBreakpoints();
    return (
        <Space>
            <div
                class="h-4 w-4"
                style={{
                    /** make number to hsl color string */
                    'background-color': bg(),
                }}
            ></div>
            <InputNumber
                value={
                    /** make 1 space plus to 12 space */
                    value.reflux(0, (val) => val * 12)
                }
                step={1}
                min={0}
            ></InputNumber>
            屏幕大小： {size()}
        </Space>
    );
};
