/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames

  Modified By KongHaYao

*/

// LICENSE is MIT
//
// Copyright (c) 2018
//   Dave Keen <http://www.keendevelopment.ch>
//   Adi Dahiya <https://github.com/adidahiya>
//   Jason Killian <https://github.com/JKillian>
//   Sean Kelley <https://github.com/seansfkelley>
//   Michal Adamczyk <https://github.com/mradamczyk>
//   Marvin Hagemeister <https://github.com/marvinhagemeister>

declare namespace IClassNames {
    type Value = string | number | boolean | undefined | null;
    type Mapping = Record<string, unknown>;
    interface ArgumentArray extends Array<Argument> {}
    type Argument = Value | Mapping | ArgumentArray;
}
export { IClassNames };
/**
 * A simple JavaScript utility for conditionally joining classNames together.
 */

let hasOwn = {}.hasOwnProperty;
export function classNames(...args: IClassNames.ArgumentArray) {
    let classes = [];

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        if (!arg) continue;

        let argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            if (arg.length) {
                let inner = classNames.apply(null, arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        } else if (argType === 'object') {
            if (
                arg.toString !== Object.prototype.toString &&
                !arg.toString.toString().includes('[native code]')
            ) {
                classes.push(arg.toString());
                continue;
            }

            for (let key in arg as IClassNames.Mapping) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}

export function classNamesWithModule(
    this: { [key: string | number]: string },
    ...args: IClassNames.ArgumentArray
) {
    let classes = [];

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        if (!arg) continue;

        let argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push((this && this[arg as string]) || arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(this, arg));
        } else if (argType === 'object') {
            if (
                arg.toString !== Object.prototype.toString &&
                !arg.toString.toString().includes('[native code]')
            ) {
                classes.push(arg.toString());
                continue;
            }

            for (let key in arg as IClassNames.Mapping) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push((this && this[key]) || key);
                }
            }
        }
    }

    return classes.join(' ');
}
