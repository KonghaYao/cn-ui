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
