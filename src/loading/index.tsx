import { classNames, toCSSPx } from '@cn-ui/reactive'
import { Flex } from '../container/Flex'
import './index.css'
import 'wc-spinners/src/components/react-spinners/bounce-spinner'
import { Accessor, JSXElement, ResolvedJSXElement } from 'solid-js'
import { useElementBounding } from 'solidjs-use'
import { Portal } from 'solid-js/web'

export const Loading = (props: { el: Accessor<ResolvedJSXElement>; children?: JSXElement; portalled?: boolean }) => {
    const bounding = useElementBounding(props.el as Accessor<HTMLDivElement>)
    const render = (
        <Flex
            class={classNames('overflow-hidden bg-gray-100/70')}
            style={{
                position: 'fixed',
                top: toCSSPx(bounding.top()),
                width: toCSSPx(bounding.width()),
                height: toCSSPx(bounding.height()),
                left: toCSSPx(bounding.left()),
                'z-index': 10000
            }}
        >
            {/* @ts-ignore */}
            {props.children ?? <bounce-spinner></bounce-spinner>}
        </Flex>
    )
    if (props.portalled) {
        return <Portal>{render}</Portal>
    } else {
        return render
    }
}
