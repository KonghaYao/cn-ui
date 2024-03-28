import './style/edit.css'
import copy from 'copy-to-clipboard'
import { extendsEvent, OriginComponent } from '@cn-ui/reactive'
import { Icon } from '../icon'
import { AiOutlineCopy } from 'solid-icons/ai'
import { NullAtom } from '@cn-ui/reactive'
import { JSXElement } from 'solid-js'

export interface EditContentProps {
    children: JSXElement
}
export const CopyText = OriginComponent<EditContentProps>((props) => {
    const container = NullAtom<HTMLSpanElement>(null)
    return (
        <span ref={props.ref} class={props.class()} style={props.style()} {...extendsEvent(props)}>
            <span ref={container!}>{props.children}</span>
            <Icon
                class="edit-text-icon"
                onClick={() => {
                    if (container()) copy(container()!.textContent!, { format: 'text/plain' })
                }}
                color="green"
            >
                <AiOutlineCopy></AiOutlineCopy>
            </Icon>
        </span>
    )
})
