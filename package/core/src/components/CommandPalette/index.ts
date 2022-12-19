import { Action } from '@cn-ui/command-palette';
import { reflect, Atom } from '@cn-ui/use';
import { atom } from '@cn-ui/use';
/**
 *
 * @zh 用于构造 关键字 Filter 的 Hook
 *
 */
export function useKeyWordsFilter(actions: Atom<Action[]>) {
    /** @zh 所有关键字的数组 */
    const keywords = reflect(() =>
        [...new Set(actions().flatMap((i) => i.keywords))].map((i) => {
            return { value: atom(false), children: i };
        })
    );

    // generate the keywords selected
    /** @zh 选中的关键字数组 */
    const selectedKeyWords = reflect(() => [
        ...new Set(
            keywords()
                .filter((i) => i.value())
                .map((i) => i.children)
        ),
    ]);

    /**
     * @zh 关键字过滤插件
     * @en static keywords Filter
     * */
    const keywordsFilter = (action: Action) => {
        /** But use reactive Object! Every search will be auto update! */
        if (selectedKeyWords().length) {
            return selectedKeyWords().every((i) => action.keywords.includes(i));
        } else {
            return true;
        }
    };
    return { keywordsFilter, keywords, selectedKeyWords };
}
