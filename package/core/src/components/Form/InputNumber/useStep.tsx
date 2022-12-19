import { Atom } from '@cn-ui/use';
import { InputNumberProps } from './InputNumber';

/** @deprecated 整数可以，但是小数就会发生不严谨 */
export const useStep = (
    value: Atom<number>,
    props: Pick<InputNumberProps, 'min' | 'max' | 'step'>
) => {
    return {
        add() {
            value((i) => {
                const result = i + (props.step || 1);
                return Math.min(result, props.max ?? Infinity);
            });
        },
        sub() {
            value((i) => {
                const result = i - (props.step || 1);
                return Math.max(result, props.min ?? -Infinity);
            });
        },
    };
};
