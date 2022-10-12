import { reflect } from '@cn-ui/use';
import { useSearchParams } from '@solidjs/router';
import Index from '../story.index.json';
export const useViewing = () => {
    const [searchParams] = useSearchParams();
    const viewing = reflect(() => {
        const path = searchParams.path;
        return (
            Index.find((item) => {
                return item.path === path;
            }) || Index[0]
        );
    });
    return { viewing };
};
