import { Animate } from '@cn-ui/animate/src/index';
import { Switch } from '@cn-ui/core';
import { Atom, atom, atomization } from '@cn-ui/use';
import { Dynamic, For, Show } from 'solid-js/web';
export const Controller = [];
import '@cn-ui/animate/src/zoom.css';
import '@cn-ui/animate/src/slide.css';
import '@cn-ui/animate/src/jump.css';
export default () => {
    const trigger = atom(true);
    const Comp = ({ name }) => {
        return (
            <div class="relative aspect-square w-full">
                <div class="absolute top-4 left-4 ">
                    <Animate anime={name} trigger={trigger}>
                        <div class=" pointer-events-none h-16 w-16  rounded-xl bg-blue-600"></div>
                    </Animate>
                </div>
                <div class="absolute  bottom-4 left-4 flex  gap-2">
                    <Animate directly group anime={name} stagger={300}>
                        <For each={trigger() ? ['', '', ''] : []}>
                            {(item) => {
                                return <div class="h-16 w-16  rounded-xl bg-blue-600"></div>;
                            }}
                        </For>
                    </Animate>
                </div>
            </div>
        );
    };
    const name = atom('slide');
    const nameList = ['slide', 'zoom', ''];
    return (
        <div>
            <Dynamic component={Comp} name={name()}></Dynamic>

            <div class="flex place-content-center">
                动画按钮
                <Switch value={trigger}></Switch>
            </div>
        </div>
    );
};
