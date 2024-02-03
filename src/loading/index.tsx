import { Flex } from '../container/Flex'
import 'wc-spinners/src/components/react-spinners/bounce-spinner'
export const Loading = () => {
    return (
        <Flex fill class="bg-gray-900 overflow-hidden aspect-square">
            <bounce-spinner></bounce-spinner>
        </Flex>
    )
}
