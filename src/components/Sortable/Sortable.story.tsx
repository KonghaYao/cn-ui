export const Controller = [];
import { Sortable, SortableList } from '@cn-ui/sortable/src/index';
import { atom } from '@cn-ui/use';
import { shuffle } from 'lodash-es';
import { For } from 'solid-js';
import { Button } from '../Button';
import { DefaultIcon } from '../Icon';
export default (props) => {
    const list = atom(
        [...Array(10).keys()].map((i) => {
            return { id: i, info: i.toString() };
        })
    );
    return (
        <div>
            <Button
                onClick={() => {
                    list((i) => {
                        return shuffle(i);
                    });
                }}
            >
                随机
            </Button>
            <div> ReactiveData</div>
            <SortableList
                each={list}
                options={{
                    handle: '.test-handle',
                }}
            >
                {(item) => {
                    return (
                        <div
                            class="p-2 "
                            // Don't forget to add a data-id prop to the wrapper dom
                            data-id={item.id}
                        >
                            <DefaultIcon
                                class="test-handle mr-2"
                                name="menu"
                                color="blue"
                            ></DefaultIcon>
                            <span class="pointer-events-none select-none">{item.info}</span>
                        </div>
                    );
                }}
            </SortableList>
        </div>
    );
};
