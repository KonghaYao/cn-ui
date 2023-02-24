import { TextColor } from '../design';
import { createMiddleware } from './createMiddleware';

export type IWithColoredText = {
    color?: keyof typeof TextColor;
    text?: true;
};
export const withColoredText = createMiddleware<IWithColoredText, { class: string }>((props) => {
    return {
        class: props.class(
            TextColor[props.color],
            'border border-solid bg-transparent hover:bg-gray-100'
        ),
    };
});
