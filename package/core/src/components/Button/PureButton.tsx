import { JSX, JSXElement } from 'solid-js';
import { Atom, OriginComponent, atomization } from '@cn-ui/use';
import { GlobalSize } from '../_util/design';
import { useEventProtect } from './createButton';

const useButtonStyleControl = (level: GlobalSize = 'md'): string => {
    if (level === 'none') return '';
    const Level = {
        sm: 'text-sm p-1 rounded-md border border-solid',
        md: 'px-2 py-1 rounded-md border border-solid active:outline-2',
        lg: 'p-2 rounded-lg border border-solid active:outline-2',
        xl: 'px-4 py-4 rounded-xl border border-solid  active:outline-4',
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
    round?: boolean | Atom<boolean>;
    block?: boolean | Atom<boolean>;
}

export const PureButton = OriginComponent<PureButtonProps, HTMLButtonElement>((props) => {
    const onClick = useEventProtect(props, 'onClick');
    const disabled = atomization(props.disabled);
    const round = atomization(props.round);
    const block = atomization(props.block);
    return (
        <button
            {...(props as any)}
            ref={props?.ref}
            class={props.class(
                useButtonStyleControl(props.size),
                'box-border inline-flex select-none items-center justify-center gap-2 whitespace-nowrap outline-none transition-all duration-150 active:scale-95 active:outline-2 active:outline-gray-200'
            )}
            // 添加失活态控制
            disabled={disabled()}
            classList={{
                'grayscale-[0.5] cursor-not-allowed active:scale-100': disabled(),
                ' rounded-full aspect-square': round(),
                'w-full': block(),
            }}
            style={props.style}
            onClick={onClick}
        ></button>
    );
});
