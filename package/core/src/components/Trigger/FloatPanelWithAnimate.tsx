import { Component } from 'solid-js';
import { FloatPanel, FloatPanelProps } from './FloatPanel';
import { Animate, AnimateProps } from '@cn-ui/animate';

interface FloatPanelWithAnimateProps extends FloatPanelProps {
    animateProps: Omit<AnimateProps, 'children' | 'trigger'>;
}
export const FloatPanelWithAnimate: Component<FloatPanelWithAnimateProps> = (props) => {
    return (
        <FloatPanel
            {...props}
            popup={(input) => {
                const { show, TailwindOriginClass } = input;
                return (
                    <Animate
                        {...props.animateProps}
                        trigger={show}
                        extraClass={TailwindOriginClass + ' ' + props.animateProps.extraClass}
                    >
                        {props.popup instanceof Function ? props.popup(input) : props.popup}
                    </Animate>
                );
            }}
        >
            {props.children}
        </FloatPanel>
    );
};
