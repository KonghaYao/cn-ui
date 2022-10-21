import { atom, reflect } from '@cn-ui/use';
import { AsyncComponent, InputNumber, Space } from '@cn-ui/core';

export const Controller = [];
export default () => {
    const value = atom(0);
    const bg = reflect(() => {
        return `#${value() * 360}`;
    });
    return (
        <AsyncComponent>
            {() => {
                return import('../components/Button/Button.story').then((res) => res.default);
            }}
        </AsyncComponent>
    );
};
