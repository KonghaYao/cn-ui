import { isArray, isObject, isString } from 'lodash-es';
import warning from './warning';

import classNames from 'classnames';
import classNamesWithModule from 'classnames/bind';
import { createMemo } from 'solid-js';
export { classNames, classNamesWithModule };

const allowedTypes = ['string', 'boolean', 'number'];
export const PropsToAttr = (props: any, omit: string[] = []) => {
    return createMemo(() =>
        Object.fromEntries(
            Object.entries(props).filter(
                (i) => !omit.includes(i[0]) && allowedTypes.includes(typeof i[1])
            )
        )
    )();
};

type ClassNamesArg = string | string[] | { [key: string]: any } | undefined | null | boolean;

export const cs = function (...args: ClassNamesArg[]): string {
    const length = args.length;
    let classNames: string[] = [];
    for (let i = 0; i < length; i++) {
        const v = args[i];
        if (!v) {
            continue;
        }
        if (isString(v)) {
            classNames.push(v);
        } else if (isArray(v)) {
            classNames = classNames.concat(v);
        } else if (isObject(v)) {
            Object.keys(v).forEach((k) => {
                if (v[k]) {
                    classNames.push(k);
                }
            });
        } else {
            warning(true, 'arguments must be one of string/array/object.');
        }
    }
    return [...new Set(classNames)].join(' ');
};
export default cs;
