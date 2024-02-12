import { JSXSlot, OriginComponent, OriginComponentInputType, OriginDiv, atom, ensureFunctionResult } from '@cn-ui/reactive'
import { VirtualList, VirtualListProps } from '../virtualList'
import { Col, Row } from '../RowAndCol'
import { BaseInput } from '../control/input'
import { Avatar } from '../avatar'
import '../animation/fade.css'
import { Transition } from 'solid-transition-group'

export interface ChatBoxMessage {
    id: string
    avatar?: string
    message: JSXSlot
    position?: 'right' | 'left'
    create_at?: string
}
export interface ChatBoxProps<T extends ChatBoxMessage> extends Pick<VirtualListProps<T>, 'each' | 'estimateSize'> {
    onSendMessage?: (text: string) => Promise<void>
}

export const ChatBox = OriginComponent(function <T extends ChatBoxMessage>(props: OriginComponentInputType<ChatBoxProps<T>, HTMLDivElement, T[]>) {
    const userMessage = atom('')
    return (
        <OriginDiv prop={props} class="flex flex-col h-full ">
            <header class="h-16 bg-gray-100"></header>
            <VirtualList transitionName="cn-fade" reverse each={props.each} estimateSize={props.estimateSize} getItemKey={(i) => props.each[i].id}>
                {(item) => {
                    return (
                        <Row bottomSpace={10}>
                            <Col span={4}>{item.position !== 'right' && <Avatar src={item.avatar} fallback={<div>A</div>}></Avatar>}</Col>
                            <Col span={16}>
                                <div class="bg-gray-100 p-2 rounded-md">{ensureFunctionResult(item.message)}</div>
                            </Col>
                            <Col span={4}>{item.position === 'right' && <Avatar src={item.avatar} fallback={<div>A</div>}></Avatar>}</Col>
                        </Row>
                    )
                }}
            </VirtualList>
            <Row class="h-24 bg-gray-100" gutter={[4, 12]}>
                <Col span={2}></Col>
                <Col span={20}>
                    <BaseInput resize={false} class="bg-white h-full w-full" type="textarea" v-model={userMessage}></BaseInput>
                </Col>
                <Col span={2}>
                    <button
                        onclick={async () => {
                            await props.onSendMessage?.(userMessage())
                            userMessage('')
                        }}
                    >
                        提交
                    </button>
                </Col>
            </Row>
        </OriginDiv>
    )
})
