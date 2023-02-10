import { Atom, atom } from './atom';

/**
 * @zh 更加简单操作数组 Atom 对象
 */
export const ArrayAtom = <T>(init?: T[]) => {
    const arr = atom(init);
    /** 指向第一个匹配到的对象 */
    const cursorItem = (i: T[], oldItem: T, func: (arr: T[], index: number) => void) => {
        const index = i.findIndex((ii) => ii === oldItem);
        if (index >= 0) {
            const newArr = [...i];
            func(newArr, index);
            return newArr;
        } else {
            console.warn("Can't find array atom Item: ", oldItem);
            return i;
        }
    };
    const modify = {
        /** 替换一个数组位置 */
        replace(oldItem: T, newItem: T) {
            arr((i) => {
                return cursorItem(i, oldItem, (arr, index) => {
                    arr[index] = newItem;
                });
            });
        },
        /** 替换所有的数组位置 */
        replaceAll(oldItem: T, newItem: T) {
            arr((i) => {
                const indexArray = [];
                i.forEach((ii, index) => ii === oldItem && indexArray.push(index));
                const newArr = [...i];
                indexArray.forEach((index) => (newArr[index] = newItem));
                return newArr;
            });
        },
        /** 根据该元素删除数组中的所有这个元素 */
        remove(item: T) {
            arr((i) => {
                return cursorItem(i, item, (arr, index) => {
                    arr.splice(index, 1);
                });
            });
        },
        removeAll(item: T) {
            arr((i) => {
                return i.filter((ii) => ii !== item);
            });
        },
        insertBefore(positionItem: T, newItem: T) {
            arr((i) => {
                return cursorItem(i, positionItem, (arr, index) => {
                    arr.splice(index, 0, newItem);
                });
            });
        },
        insertAfter(positionItem: T, newItem: T) {
            arr((i) => {
                return cursorItem(i, positionItem, (arr, index) => {
                    arr.splice(index + 1, 0, newItem);
                });
            });
        },
    };
    return Object.assign(arr, modify) as any as Atom<T[]> & typeof modify;
};
