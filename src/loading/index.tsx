import { classNames } from '@cn-ui/reactive'
import { Flex } from '../container/Flex'
import 'wc-spinners/src/components/react-spinners/bounce-spinner'
export const Loading = (props: { floating?: boolean }) => {
    return (
        <Flex fill class={classNames('overflow-hidden aspect-square', props.floating && 'absolute top-0 left-0 bg-gray-100/70')}>
            {/* @ts-ignore */}
            <bounce-spinner></bounce-spinner>
        </Flex>
    )
}
