import { OriginComponent } from '@cn-ui/use';
import { useContext } from 'solid-js';
import { ensureGet, hSizeStairs } from '../_util';
import { SkeletonContext } from './Skeleton';

export const SkeletonParagraph = OriginComponent((props) => {
    const context = useContext(SkeletonContext) ?? {};

    return (
        <div
            class={props.class(
                ensureGet<string>(hSizeStairs, context.size, 'h-4'),
                'rounded-sm bg-gray-200'
            )}
            style={props.style}
        ></div>
    );
});
