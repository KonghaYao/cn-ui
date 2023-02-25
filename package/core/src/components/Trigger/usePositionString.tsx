import { JSX } from 'solid-js';

/** 将位置符号转变为 style 对象 */
export const usePositionString = (
    s: 'l' | 'r' | 't' | 'b' | 'tl' | 'lt' | 'lb' | 'bl' | 'br' | 'rb' | 'rt' | 'tr'
): JSX.CSSProperties => {
    switch (s) {
        case 'l':
            return {
                top: '50%',
                left: 0,
                'transform-origin': 'right',
                translate: '-100% -50%',
            };
        case 'r':
            return {
                top: '50%',
                right: 0,
                'transform-origin': 'left',
                translate: '100% -50%',
            };
        case 't':
            return {
                top: 0,
                left: '50%',
                'transform-origin': 'bottom',
                translate: '-50% -100%',
            };
        case 'b':
            return {
                left: '50%',
                bottom: 0,
                'transform-origin': 'top',
                translate: '-50% 100%',
            };
        case 'tl':
            return {
                top: 0,
                left: 0,
                'transform-origin': 'bottom left',
                translate: '0% -100%',
            };
        case 'tr':
            return {
                top: 0,
                right: 0,
                'transform-origin': 'bottom right',
                translate: '0% -100%',
            };
        case 'rt':
            return {
                right: 0,
                top: 0,
                'transform-origin': 'top left',
                translate: '100% 0',
            };
        case 'lt':
            return {
                left: 0,
                top: 0,
                'transform-origin': 'top right',
                translate: '-100% 0',
            };
        case 'lb':
            return {
                left: 0,
                bottom: 0,
                'transform-origin': 'bottom right',
                translate: '-100% 0',
            };
        case 'rb':
            return {
                right: 0,
                bottom: 0,
                'transform-origin': 'bottom left',
                translate: '100% 0',
            };
        case 'bl':
            return {
                left: 0,
                bottom: 0,
                'transform-origin': 'top left',
                translate: '0% 100%',
            };
        case 'br':
            return {
                right: 0,
                bottom: 0,
                'transform-origin': 'top right',
                translate: '0 100%',
            };
    }
};
