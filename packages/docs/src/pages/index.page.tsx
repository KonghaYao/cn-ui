import { Flex, Message } from '@cn-ui/core'
import { Header } from '../components/Header'

export const IndexPage = () => {
    return (
        <>
            <Header></Header>
            <Flex
                class="h-screen"
                onclick={() => {
                    Message.success('hello world')
                }}
            >
                cosngo
            </Flex>
        </>
    )
}
