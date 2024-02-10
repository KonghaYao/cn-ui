import { JSXSlot, OriginComponent, OriginComponentInputType, OriginDiv, ensureFunctionResult } from '@cn-ui/reactive'
import { VirtualList, VirtualListProps } from '../virtualList'
import { Col, Row } from '../RowAndCol'

export interface ChatBoxMessage {
    id: string
    message: JSXSlot
    position?: 'right' | 'left'
    create_at?: string
}
export interface ChatBoxProps<T extends ChatBoxMessage> extends Pick<VirtualListProps<T>, 'each' | 'estimateSize'> {}

export const ChatBox = OriginComponent(function <T extends ChatBoxMessage>(props: OriginComponentInputType<ChatBoxProps<T>, HTMLDivElement, T[]>) {
    return (
        <OriginDiv prop={props} class="flex flex-col h-full ">
            <VirtualList reverse each={props.each} getItemKey={(i) => props.each[i].id}>
                {(item) => {
                    return (
                        <Row bottomSpace={10}>
                            <Col span={4}>
                                <div class="aspect-square bg-gray-100 h-8"></div>
                            </Col>
                            <Col span={16}>
                                <div class="bg-gray-100 p-2 rounded-md">{ensureFunctionResult(item.message)}</div>
                            </Col>
                            <Col span={4}>
                                <div class="aspect-square bg-gray-100 h-8"></div>
                            </Col>
                        </Row>
                    )
                }}
            </VirtualList>
            <div class="h-32 bg-gray-100"></div>
        </OriginDiv>
    )
})
