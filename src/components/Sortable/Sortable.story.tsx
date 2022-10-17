export const Controller = [];
import { SortableList, SortableShared } from '@cn-ui/sortable/src/index';
import { Atom, atom, reflect } from '@cn-ui/use';
import { shuffle } from 'lodash-es';
import { createContext, createEffect, For, useContext } from 'solid-js';
import { Button } from '../Button';
import { DefaultIcon } from '../Icon';
import { Message } from '../Message';
import { Space } from '../Space';

const NormalList = () => {
    const { normalList: list } = useContext(ListContext);
    return (
        <section>
            <Button onClick={() => list((i) => shuffle(i))}>随机</Button>
            <div> ReactiveData: {JSON.stringify(list().map((i) => i.info))}</div>
            <SortableList each={list}>
                {(item) => {
                    return (
                        <div
                            class="m-2 select-none bg-gray-50 p-2 text-center"
                            // Don't forget to add a data-id prop to the wrapper dom
                            data-id={item.id}
                        >
                            {item.info}
                        </div>
                    );
                }}
            </SortableList>
        </section>
    );
};

const SharedList = () => {
    const { list, anotherList } = useContext(ListContext);
    const render = (isLeft: boolean) => (item: any) => {
        return (
            <div
                class="m-2 select-none "
                classList={{
                    'bg-red-50': isLeft,
                    'bg-blue-50': !isLeft,
                }}
                data-id={item.id}
            >
                {item.info}
            </div>
        );
    };
    const sum = (list: number[]) => list.reduce((a, b) => a + b, 0);
    const sumOfLeft = reflect(() => sum(list().map((i) => i.id)));
    const sumOfRight = reflect(() => sum(anotherList().map((i) => i.id)));
    createEffect(() => {
        if (sumOfLeft() === sumOfRight()) {
            Message.init();
            Message.success('你成功了');
        }
    });
    return (
        <section>
            <h3> Shared List ! All Reactive</h3>
            <div class="text-center">
                <kbd>{sumOfLeft()}</kbd> :<kbd>{sumOfRight()}</kbd>
            </div>
            <Space>
                <SortableShared.Provider
                    value={{
                        // create an environment to shared the data
                        sharedData: [list, anotherList],
                    }}
                >
                    <SortableList
                        class="flex-1  text-center"
                        each={list}
                        // the group must be the same string
                        options={{ group: 'KongHaYao' }}
                    >
                        {render(false)}
                    </SortableList>
                    <SortableList
                        class="flex-1  text-center"
                        each={anotherList}
                        // the group must be the same string
                        options={{ group: 'KongHaYao' }}
                    >
                        {render(true)}
                    </SortableList>
                </SortableShared.Provider>
            </Space>
        </section>
    );
};

const ListContext = createContext({
    normalList: atom(
        [...Array(5).keys()].map((i) => {
            return { id: i, info: i.toString() };
        })
    ),
    list: atom(
        [...Array(10).keys()].map((i) => {
            return { id: i, info: i.toString() };
        })
    ),
    anotherList: atom(
        [...Array(10).keys()].map((i) => {
            return { id: i + 10, info: (i + 10).toString() };
        })
    ),
});
export default (props) => {
    return (
        <ListContext.Provider value={undefined}>
            <NormalList></NormalList>
            <SharedList></SharedList>
        </ListContext.Provider>
    );
};
