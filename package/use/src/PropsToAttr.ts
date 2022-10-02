import { createMemo } from 'solid-js';

const allowedTypes = ['string', 'boolean', 'number'];

/**
 * @zh 将 props 中的 string boolean number 类型抽离出来
 * @en Extract the string boolean number type  from  props
 * @example
 * const Comp = (props)=>{
 *     return <div {...PropsToAttr(props)}></div>
 * }
 * @description 作用为传递外层静态属性到内层标签上
 */
export const PropsToAttr = (props: any, omit: string[] = []) => {
    return createMemo(() =>
        Object.fromEntries(
            Object.entries(props).filter(
                (i) => !omit.includes(i[0]) && allowedTypes.includes(typeof i[1])
            )
        )
    )();
};
