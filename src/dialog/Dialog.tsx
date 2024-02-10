import { NullAtom, OriginComponent, OriginDiv, createCtx } from '@cn-ui/reactive'
import { Show } from 'solid-js'
import { useBooleanState } from './useBooleanState'
import { GlobalDialog } from './useGlobalDialog'
import { onClickOutside } from 'solidjs-use'

export const DialogCtx = createCtx<DialogExpose>()
export interface DialogExpose extends ReturnType<typeof useBooleanState> {}
export const Dialog = OriginComponent<{ id?: string }, HTMLDivElement, boolean>((props) => {
    const expose: DialogExpose = {
        ...useBooleanState(props.model)
    }
    if (props.id) GlobalDialog().register(props.id, expose)
    const dialog = NullAtom<HTMLDivElement>(null)
    onClickOutside(dialog, () => {
        expose.hide()
    })
    return (
        <DialogCtx.Provider value={expose}>
            <Show when={props.model()}>
                <div id={props.id} class="fixed top-0 pointer-events-none left-0 h-full w-full flex justify-center items-center">
                    <OriginDiv prop={props} class=" pointer-events-auto rounded-lg" ref={dialog}>
                        {props.children}
                    </OriginDiv>
                </div>
            </Show>
        </DialogCtx.Provider>
    )
})
