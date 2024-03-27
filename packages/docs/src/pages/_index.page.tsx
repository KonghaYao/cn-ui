import { Flex, Message } from '@cn-ui/core'

export const IndexPage = () => {
    return (
        <>
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
