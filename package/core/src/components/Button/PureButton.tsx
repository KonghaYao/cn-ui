import { JSX, JSXElement } from 'solid-js';
import { Atom, OriginComponent, atomization } from '@cn-ui/use';
import { GlobalSize } from '../_util/design';
import { useEventProtect } from './createButton';

const useButtonStyleControl = (level: GlobalSize = 'md'): string => {
    if (level === 'none') return '';
    const Level = {
        sm: 'text-sm p-1 rounded-md border border-solid',
        md: 'text-md px-2 py-1 rounded-md shadow-lg active:outline-2',
        lg: 'text-md p-2 rounded-md shadow-lg active:outline-2',
        xl: 'text-md px-4 py-4 rounded-lg shadow-lg  active:outline-4',
    };
    return Level[level];
};
export interface PureButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    children?: JSXElement;

    /**
     * @zh 按钮的尺寸
     */
    size?: GlobalSize;
    disabled?: boolean | Atom<boolean>;
}

export const PureButton = OriginComponent<PureButtonProps, HTMLButtonElement>((props) => {
    const onClick = useEventProtect(props, 'onClick');
    const disabled = atomization(props.disabled);
    return (
        <button
            {...(props as any)}
            ref={props?.ref}
            class={props.class(
                useButtonStyleControl(props.size),
                'box-border inline-flex select-none items-center justify-center whitespace-nowrap outline-none transition-all duration-150 active:scale-95 active:outline-2 active:outline-gray-200 '
            )}
            // 添加失活态控制
            disabled={disabled()}
            classList={{
                'brightness-90 opacity-80 cursor-not-allowed active:scale-100': disabled(),
            }}
            style={props.style}
            onClick={onClick}
        ></button>
    );
});
