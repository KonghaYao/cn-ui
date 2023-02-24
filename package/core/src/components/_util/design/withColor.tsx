import { Colors } from '../design';
import { createMiddleware } from './createMiddleware';
import { IWithGradientPart } from './withGradient';

export type IWithColorPart = { color?: keyof typeof Colors };

/**
 * 为组件附着 color
 * @important 配合 OriginComponent 使用
 */

export const withColor = createMiddleware<IWithGradientPart, { class: string }>((props) => {
    return {
        class: props.class(Colors[props.color], props.color !== 'white' && 'text-white'),
    };
});
