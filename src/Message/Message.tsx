import { SetStoreFunction, createStore } from 'solid-js/store'
import { Modal } from '../Modal/Modal'
import { JSXSlot, atom } from '@cn-ui/reactive'
import { createRuntimeArea } from './runtime'
import { Alert } from './Alert'

export interface MessageInfo {
    id?: number | string
    title: JSXSlot
    description?: JSXSlot
    duration?: number
    type: 'info' | 'success' | 'error' | 'warning'
    closable?: boolean
}

export class MessageControl {
    constructor(public id: string) {
        const [store, setStore] = createStore<MessageInfo[]>([])
        this.store = store
        this.setStore = setStore
        createRuntimeArea(id, () => this.render({ store, setStore }))
    }
    public store: MessageInfo[]
    public setStore: SetStoreFunction<MessageInfo[]>
    public removeMessage(id: string | number) {
        return this.setStore((arr) => {
            return arr.filter((i) => i.id !== id)
        })
    }
    private render(props: { store: MessageInfo[]; setStore: SetStoreFunction<MessageInfo[]> }) {
        const show = atom(true)
        return (
            <Modal v-model={show} each={props.store} by={(i) => i.id!} position="top">
                {(item, index) => {
                    return (
                        <Alert
                            class="h-full rounded-md"
                            type={item.type}
                            title={item.title}
                            description={item.description}
                            icon
                            closable={item.closable}
                            onClose={() => this.removeMessage(item.id!)}
                        ></Alert>
                    )
                }}
            </Modal>
        )
    }
    private autoKey = 0
    public create(message: JSXSlot, type: MessageInfo['type'], duration?: number) {
        const id = this.autoKey++
        const item = { id, title: message, type, duration }
        this.setStore((arr) => {
            return [item, ...arr]
        })
        this.durationClose(item, duration)
        return item
    }
    private durationClose(item: MessageInfo, duration = 3000) {
        if (duration <= 0) {
            return
        }
        setTimeout(() => {
            this.removeMessage(item.id!)
        }, duration)
    }
    public info(message: JSXSlot, duration?: number) {
        return this.create(message, 'info', duration)
    }

    public success(message: JSXSlot, duration?: number) {
        return this.create(message, 'success', duration)
    }

    public warning(message: JSXSlot, duration?: number) {
        return this.create(message, 'warning', duration)
    }

    public error(message: JSXSlot, duration?: number) {
        return this.create(message, 'error', duration)
    }
}
export const Message = new MessageControl('cn-ui-message-layers')
