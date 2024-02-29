import { NullAtom, computed, createBlackBoard } from '@cn-ui/reactive'
import { Dynamic } from 'solid-js/web'

export const FormCoreRegister = createBlackBoard<Record<string, any>>()

export const FormCore = (props: { config: any }) => {
    const model = NullAtom(null)
    return <Dynamic component={FormCoreRegister.getApp(props.config.type)} {...props.config} v-model={model}></Dynamic>
}
