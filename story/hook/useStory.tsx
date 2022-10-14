import { atom, useSingleAsync } from '@cn-ui/use';
import { batch, createEffect, createMemo } from 'solid-js';
import { useViewing } from './useViewing';

const modules = import.meta.glob('/src/components/**/*.story.tsx');

/** 将项目中的 story 文件抽取出来 */
export const useStory = (GetViewing = useViewing) => {
    const { viewing } = GetViewing();

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
        // debugger;
        batch(() => {
            Controller(module.Controller || []);
            Props(props);
            console.log('加载完成');
            // 当 Atom 为函数时，只能够以函数的方式改变其值
            Content(() => module.default);
        });
    });
    createEffect(refresh);
    return {
        Props,
        Controller,
        Content,
    };
};
