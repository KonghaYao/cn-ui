import { Portal, render } from 'solid-js/web';
import { Mask } from '../Mask/index';
import { createTemplate, SlotMap } from '@cn-ui/use';

const { Template, register, DataContext } = createTemplate<{}, 'Drawer', 'Inner'>();

export { register as OuterSpaceRegister, DataContext as OuterSpaceContext };
const OuterSpace = Template(({ Slots, SlotList }) => {
    return (
        <Mask
            style={{
                'z-index': 1000,
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                'pointer-events': 'none',
            }}
        >
            <SlotMap list={SlotList.Inner}></SlotMap>
        </Mask>
    );
});
/** 向全局注入一个默认的 Layer 空间，生命周期为 solid 全生命 */
render(() => {
    return <OuterSpace></OuterSpace>;
}, document.body);
