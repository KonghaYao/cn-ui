import { createSignal } from 'solid-js';
import { extendsEvent } from '@cn-ui/use';
import { CollapseProps } from './interface';
import { OriginComponent } from '@cn-ui/use';
import { Controller, CollapseContext } from './Controller';
import './style/index.css';

export const Collapse = OriginComponent<CollapseProps, HTMLDivElement>((props) => {
    const [controllers, CommitController] = createSignal<Controller>({}, { equals: false });
    return (
        <CollapseContext.Provider
            value={{
                CommitController,
                lazyload: props.lazyload,
                destroyOnHide: props.destroyOnHide,
                onToggle: (key, state, e) => {
                    const c = controllers();
                    if (props.accordion && state) {
                        Object.entries(c).forEach(([name, toggle]) => {
                            toggle(key === name);
                        });
                    } else {
                        c[key](state);
                    }
                    props.onPanelChange && props.onPanelChange(key, e);
                },
            }}
        >
            <div
                class={props.class('cn-collapse w-full')}
                style={props.style}
                ref={props.ref}
                {...extendsEvent(props)}
            >
                {props.children}
            </div>
        </CollapseContext.Provider>
    );
});
