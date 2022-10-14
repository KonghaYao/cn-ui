import { windowEndpoint, expose } from 'comlink';
import { onMount } from 'solid-js';
import { Dynamic, render } from 'solid-js/web';
import { useStory } from '../hook/useStory';
const getURL: any = () => {
    const path = location.hash.split('path=')[1];
    console.log(path);
    return {
        viewing: () => ({ path }),
    };
};
import './index.css';
import '@cn-ui/core/index.css';
const Book = () => {
    const { Props, Content } = useStory(getURL);
    expose(
        {
            changeProps(props) {
                Props(props);
                console.log('传递 props', props);
                return true;
            },
        },
        windowEndpoint(self.parent)
    );

    return (
        <>
            <Dynamic component={Content()} {...Props()}></Dynamic>
        </>
    );
};
const App = () => {
    onMount(() => console.log('rerender'));
    return <Book></Book>;
};
render(App, document.body);
