import { windowEndpoint, expose } from 'comlink';
import { batch, onMount, Show } from 'solid-js';
import { Dynamic, render } from 'solid-js/web';
import { useStory } from '../hook/useStory';
import { Client as console } from '../utils/log';
const getURL: any = () => {
    const path = location.hash.split('path=')[1];
    return {
        viewing: () => ({ path }),
    };
};
import './index.css';
import '@cn-ui/core/index.css';
import { atom } from '@cn-ui/use';
const Book = () => {
    const Props = atom(null);
    const { Content } = useStory(getURL);
    expose(
        {
            changeProps(props: unknown) {
                batch(() => {
                    Props(props);
                });

                console.info('receive props', props);
                return true;
            },
        },
        windowEndpoint(self.parent)
    );
    onMount(() => {
        console.success('build success', getURL().viewing().path);
    });
    return (
        <Show when={Props()} fallback={'waiting for props'}>
            <Dynamic component={Content()} {...Props()}></Dynamic>
        </Show>
    );
};
const App = () => {
    return <Book></Book>;
};
render(App, document.body);