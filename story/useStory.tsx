import Index from '../src/story.index.json';
import { useSearchParams } from '@solidjs/router';
import { atom, reflect } from '@cn-ui/use';
import { batch } from 'solid-js';

const modules = import.meta.glob('/src/components/**/*.story.tsx');

export const useStory = () => {
    const [searchParams] = useSearchParams();
    const path = reflect(() => {
        return searchParams.path || Index[0];
    });
    /** 注入组件的参数 */
    const Props = atom({});
    /** 组件的表单选择器 */
    const Controller = atom([]);
    const Content = atom(() => {
        return <div>Loading</div>;
    });
    const refetch = async () => {
        return batch(async () => {
            const loader = modules[path()];
            console.log(path());
            if (!loader) return;

            const module: any = await loader();
            Controller(module.Controller || []);
            const props =
                module.Controller.reduce((col, cur) => {
                    col[cur.prop] = cur.default;
                    return col;
                }, {}) || {};
            Props(props);
            // 当 Atom 为函数时，只能够以函数的方式改变其值
            Content(() => module.default);
        });
    };
    refetch();

    return {
        Props,
        Controller,
        refreshStory: refetch,
        Content,
    };
};
