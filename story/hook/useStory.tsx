import Index from '../story.index.json';
import { useSearchParams } from '@solidjs/router';
import { atom, reflect, useSingleAsync } from '@cn-ui/use';
import { batch, createEffect } from 'solid-js';
import { useViewing } from './useViewing';

const modules = import.meta.glob('/src/components/**/*.story.tsx');

/** 将项目中的 story 文件抽取出来 */
export const useStory = () => {
    const { viewing } = useViewing();

    /** 注入组件的参数 */
    const Props = atom({});
    /** 组件的表单选择器 */
    const Controller = atom([]);
    const Content = atom(() => {
        return <div>Loading</div>;
    });
    const refresh = useSingleAsync(async () => {
        const loader = modules['/' + viewing().path];
        console.log(viewing().path);
        if (!loader) return;

        const module: any = await loader();

        const props =
            module.Controller.reduce((col, cur) => {
                col[cur.prop] = cur.default;
                return col;
            }, {}) || {};
        batch(() => {
            Controller(module.Controller || []);
            Props(props);
            // 当 Atom 为函数时，只能够以函数的方式改变其值
            Content(() => module.default);
        });
    });
    createEffect(() => {
        viewing(); // 依赖收集
        refresh();
    });

    return {
        Props,
        Controller,
        Content,
    };
};
