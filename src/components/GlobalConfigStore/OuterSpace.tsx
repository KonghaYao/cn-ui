import { Portal, render } from 'solid-js/web';
import { Relative } from '../Mask/index';
import { createTemplate, SlotMap } from '@cn-ui/use';

/** simple memorize result of getOutSpace */
const memoize = function <T extends Function>(func: T) {
    let result = undefined;
    return (...args: any[]) => {
        if (result) return result;
        result = func(...args);
        return result;
    };
};
export const getOutSpace = memoize(() => {
    const Server = createTemplate<{}, 'Drawer', 'Inner'>();

    // 注意，这个没有被导出
    const OuterSpace = Server.Template(({ Slots, SlotList }) => {
        return (
            <Relative
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
            </Relative>
        );
    });
    /** 向全局注入一个默认的 Layer 空间，生命周期为 solid 全生命 */
    render(() => {
        return <OuterSpace></OuterSpace>;
    }, document.body);

    return Server;
});
