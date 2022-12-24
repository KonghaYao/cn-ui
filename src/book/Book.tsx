import { windowEndpoint, expose } from 'comlink';
import { createEffect, createSignal, onMount, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useStory } from '../hook/useStory';
import { Client as console } from '../utils/log';
import { atom } from '@cn-ui/use';
import { getURL } from './getURL';

export const Book = () => {
    const [Props, setProps] = createSignal(null);
    const { Content } = useStory(getURL);
    expose(
        {
            changeProps(props: unknown) {
                setProps(props);
                console.info('receive props', Props());
                return true;
            },
        },
        windowEndpoint(self.parent)
    );
    createEffect(() => {
        Content();
        console.log('centent');
    });
    onMount(() => {
        console.success('build success', getURL().viewing().path);
    });
    return (
        <Show when={Props()} fallback={'waiting for props'}>
            <Dynamic component={Content()} {...Props()}></Dynamic>
        </Show>
    );
};
