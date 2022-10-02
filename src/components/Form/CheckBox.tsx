import { JSX, JSXElement } from 'solid-js';
import { atom, Atom, atomization } from '../_util/atom';
import { OriginComponent } from '../_util/OriginComponent';

interface LabelProps extends JSX.HTMLAttributes<HTMLLabelElement> {
    children?: JSXElement;
    for?: string;
}
export const DefaultLabel = OriginComponent<LabelProps, HTMLLabelElement>((props) => {
    return (
        <label
            {...props}
            class={props.class('cn-form-label inline-block text-gray-800')}
            style={props.style}
        >
            {props.children}
        </label>
    );
});
interface CheckBoxProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSXElement;
    value?: boolean | Atom<boolean>;
    checkedChar?: string;
    onValueChange?: (e, value: boolean) => void | Promise<boolean>;
}
enum PROMISE_STATE {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected',
}
const getPromiseState = async (promise: Promise<unknown>): Promise<PROMISE_STATE> => {
    const t = {};
    return Promise.race([promise, t])
        .then((v) => (v === t ? PROMISE_STATE.PENDING : PROMISE_STATE.FULFILLED))
        .catch(() => PROMISE_STATE.REJECTED);
};
const useSingleAsync = () => {
    let line = Promise.resolve();

    return {
        async newChannel<T, D extends Array<unknown>>(
            asyncFunc: (...args: D) => T,
            ...args: D
        ): Promise<Awaited<T>> {
            const state = await getPromiseState(line);
            if (state === 'pending') return;
            const it = asyncFunc(...args);
            line = it as any;
            return await it;
        },
    };
};

import './style/checkbox.css';
export const CheckBox = OriginComponent<CheckBoxProps, HTMLDivElement>((props) => {
    const value = atomization(props.value);
    const { newChannel: ClickChannel } = useSingleAsync();
    return (
        <div class={props.class('cn-form-check')} style={props.style}>
            <span
                class="cn-check appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                /** @ts-ignore */
                attr:checked={value()}
                onClick={(e) => {
                    ClickChannel(async (e) => {
                        const old = value();
                        const keep = props.onValueChange && (await props.onValueChange(e, !old));
                        if (keep === false) return;
                        value(!old);
                    }, e);
                }}
                checked-char={props.checkedChar ?? '√'}
            ></span>
            <input class="hidden" type="checkbox" checked={value()} id={props.id}></input>
            <DefaultLabel for={props.id}>{props.children}</DefaultLabel>
        </div>
    );
});
