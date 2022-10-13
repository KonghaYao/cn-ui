import { useSearchParams } from '@solidjs/router';
import { createMemo } from 'solid-js';
import Index from '../story.index.json';
export const useViewing = () => {
    const [searchParams] = useSearchParams();
    const viewing = createMemo(() => {
        const path = searchParams.path;
        return (
            Index.find((item) => {
                return item.path === path;
            }) || Index[0]
        );
    });
    return { viewing };
};
