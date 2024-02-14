import { createBlackBoard } from '@cn-ui/reactive'
import type { BaseInput } from '../input/BaseInput'

export const ControlCenter = createBlackBoard<{
    text: typeof BaseInput
}>({
    allowSameRegister: true
})
