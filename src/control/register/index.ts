import { createBlackBoard } from '@cn-ui/reactive'
import { BaseInput } from '../input/BaseInput'

export const ControlCenter = createBlackBoard<{
    text: typeof BaseInput
}>()
