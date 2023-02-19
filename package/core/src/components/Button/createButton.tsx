import { Atom, atom, reflect, resource, useEffect } from '@cn-ui/use';
import { debounce } from 'lodash-es';
import { Accessor, createMemo } from 'solid-js';

function DebounceAtom<T>(a: Atom<T>, debounceTime?: 150): Accessor<T> {
    return createMemo(
        debounce(() => a()),
        debounceTime
    );
}

export const useButton = ({ onClick }) => {
    const loading = resource(onClick, { immediately: false });
    return {
        loading: DebounceAtom(loading),
        onClick(e) {
            return loading.refetch();
        },
    };
};
