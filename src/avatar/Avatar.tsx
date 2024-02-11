import { Avatar } from '@ark-ui/solid'
import { DefaultAC, JSXSlot, ensureFunctionResult } from '@cn-ui/reactive'

const Basic = (props: { fallback?: JSXSlot; src: string }) => (
    <Avatar.Root>
        <Avatar.Fallback>{ensureFunctionResult(props.fallback ?? DefaultAC.fallback)}</Avatar.Fallback>
        <Avatar.Image src={props.src} alt="avatar" class="rounded-full" />
    </Avatar.Root>
)

export { Basic as Avatar }
