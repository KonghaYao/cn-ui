import { createMemo, createSelector } from 'solid-js';
import { useWindowResize } from './useWindowResize';
export const breakpointsTailwind = {
    xs: 300, // 不需要进行判断这个
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

/** 根据屏幕宽度给予对应的 size 标记 */
export const useBreakpoints = () => {
    const { width } = useWindowResize();
    const size = createMemo<keyof typeof breakpointsTailwind>(() => {
        const w = width();
        return (
            (['2xl', 'xl', 'lg', 'md', 'sm'] as const).find((i) => {
                return w > breakpointsTailwind[i];
            }) ?? 'xs'
        );
    });
    return {
        isSize: createSelector(size),
        size,
    };
};
