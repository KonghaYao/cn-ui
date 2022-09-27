import {
    Accessor,
    Component,
    createContext,
    createSignal,
    For,
    JSXElement,
    onMount,
    useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';

type SlotType = Component;
type SlotsType<Key extends string> = Record<Key, SlotType>;
type SlotListType<Key extends string> = Record<Key, SlotType[]>;

export function createServer<
    DataType extends {},
    SlotNames extends string,
    SlotListNames extends string
>(init?: DataType) {
    const DataContext = createContext<DataType>(init!);
    const register = ({
        slot,
        component: Comp,
        list,
    }: ({ slot: SlotNames; list?: false } | { slot: SlotListNames; list: true }) & {
        component: Component<DataType>;
    }) => {
        const wrapper = () => {
            const data = useContext(DataContext);
            return <Comp {...data}></Comp>;
        };

        if (list) {
            // 更新状态
            setSlotList(slot, (list) => {
                return [...(list || []), wrapper];
            });
        } else {
            setSlots(slot, wrapper);
        }
    };

    const [Slots, setSlots] = createStore<SlotsType<SlotNames>>({} as any);
    const [SlotList, setSlotList] = createStore<SlotListType<SlotListNames>>({} as any);
    const [data, setData] = createSignal<DataType>(init);

    /** 用于外包一个组件，使其内部可以写一个 Template 来渲染 Slot */
    function Template<T>(
        InnerUI: Component<
            T & {
                Slots: SlotsType<SlotNames>;
                SlotList: SlotListType<SlotListNames>;
            }
        >
    ): Component<T> {
        return (props: T) => {
            return (
                <DataContext.Provider value={data()}>
                    <InnerUI {...props} Slots={Slots} SlotList={SlotList}></InnerUI>
                </DataContext.Provider>
            );
        };
    }
    return {
        Template,
        register,
        DataContext,
        setData,
        data,
    };
}

export const SlotMap = (props: {
    list: SlotType[];
    children?: (i: SlotType, index: Accessor<number>) => JSXElement;
}) => {
    const mapper = props.children || ((I: SlotType, index: Accessor<number>) => <I />);

    return <For each={props.list}>{mapper}</For>;
};
