// import React, { useState, useContext, forwardRef, CSSProperties } from 'react';

import { TagProps } from './interface';
import { createMemo, Match, mergeProps, Show, Switch } from 'solid-js';
import { atom, atomization, emitEvent, extendsEvent, useEventController } from '@cn-ui/use';
import { Icon } from '@cn-ui/core';

import { OriginComponent } from '@cn-ui/use';
import { Gradient } from '../_util/design';
export const Tag = OriginComponent<TagProps, HTMLDivElement>((props) => {
    const visible = atomization(props.visible ?? true);

    const closing = atom(false);
    const Close = async (e) => {
        closing(true);
        if (props.onClose) await props.onClose(e);
        visible(false);
        closing(false);
    };

    return (
        <Show when={visible()}>
            <div
                ref={props.ref}
                style={props.style}
                class={props.class(
                    'cn-tag',
                    'box-border inline-flex cursor-pointer select-none items-center rounded-md px-2 py-1 text-sm font-light leading-none  shadow-suit',
                    {
                        [`loading`]: closing(),
                    },
                    props.size,
                    Gradient.position,
                    Gradient[props.color ?? 'blue']
                )}
                {...extendsEvent(props)}
            >
                <div class="content">{props.children}</div>
                <Switch>
                    <Match when={closing()}>
                        <Icon name="refresh" spin class="loading-icon" />
                    </Match>
                    <Match when={props.closable && props.closeIcon !== null}>
                        <Icon name="close" class={`close-icon`} onClick={Close} />
                    </Match>
                </Switch>
            </div>
        </Show>
    );
});
