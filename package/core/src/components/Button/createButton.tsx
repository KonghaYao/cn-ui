import { OriginComponentInputType } from '@cn-ui/use';
import { resource, DebounceAtom } from '@cn-ui/use';
import { ButtonProps } from './interface';

export const useButton = (props: OriginComponentInputType<ButtonProps, HTMLButtonElement>) => {
    const query = resource(props.onClick ?? (() => {}), { immediately: false });
    return {
        // 设置 10 ms 是为了解决同步状态闪过问题
        loading: DebounceAtom(query.loading, 10),
        onClick(e) {
            return query.refetch();
        },
    };
};
