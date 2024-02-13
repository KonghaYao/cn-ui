import { AiOutlineLoading3Quarters } from 'solid-icons/ai'
import { Icon } from '../icon/Icon'
import '../animation/spin.css'
export const ButtonStore = {
    loadingIcon: () => {
        return (
            <Icon class="pr-1">
                <AiOutlineLoading3Quarters class=" cn-animate-spin"></AiOutlineLoading3Quarters>
            </Icon>
        )
    }
}
export const DefineButton = (store: typeof ButtonStore) => {
    Object.assign(ButtonStore, store)
}
