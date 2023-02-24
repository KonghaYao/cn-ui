import { Colors, Gradient } from '../design';
import { createMiddleware } from './createMiddleware';

export type IWithGradientPart = { color?: keyof typeof Colors; gradient?: boolean };

/**
 * 为组件附着 color
 * @important 配合 OriginComponent 使用
 */
export const withGradient = createMiddleware<IWithGradientPart, { class: string }>((props) => {
    return {
        class: props.class(Gradient.position, Gradient[props.color]),
    };
});
