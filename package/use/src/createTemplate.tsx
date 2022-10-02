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

/**
 *
 * @zh 创建类似于 Template，Slot 的编程体验！
 * @en Create a programming experience similar to Template, Slot!
 * @example
import { createTemplate, SlotMap } from '@cn-ui/use';


// Drawer is the key of Object Slots
// Inner is the key of Object SlotsList
// Slots is like { [key:string]: Component }
// SlotsList is like  Component[]
const { Template, register } = createTemplate<{}, 'Drawer', 'Inner'>();

const Comp = Template((props) => {
    // Template will add Slots and SlotList to props,
    const { Slots, SlotList } = props
    return (
        <div>
            <SlotMap list={SlotList.Inner}></SlotMap>
        </div>
    );
});

// anyway anytime you could register a component to any component decorated by Template!
register({
  slot: 'Inner', // key which will be used to get in the Template Slots
  list: true, // if true, this component will add to SlotsList rather then Slots
  component: Comp
});

 */
export function createTemplate<
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
            /** @ts-ignore */
            setSlotList(slot, (list) => {
                /** @ts-ignore */
                return [...(list || []), wrapper];
            });
        } else {
            /** @ts-ignore */
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
