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

let hasOwn = {}.hasOwnProperty;
/**
 * @category classNames
 * @en A simple JavaScript utility for conditionally joining classNames together.
 * @zh 合成 className 和 class 为字符串的一个库
 * @description 源自 classnames 库
 */
export function classNames(...args: IClassNames.ArgumentArray): string {
    let classes: (string | number)[] = [];

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        if (!arg) continue;

        if (typeof arg === 'string' || typeof arg === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            if (arg.length) {
                let inner = classNames.apply(null, arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        } else if (typeof arg === 'object') {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
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

/**
 * @category classNames
 * @en A simple JavaScript utility for conditionally joining classNames together.
 * @zh 合成 className 和 class 为字符串的一个库
 * @description 源自 classnames 库
 * @example
 *
import styles from './submit-button.css';
let cx = classNames.bind(styles); // bind css module Object
let className = cx({
  base: true,
  inProgress: props.submissionInProgress,
  error: props.errorOccurred,
  disabled: props.form.valid,
});
 */
export function classNamesWithModule(this: { [key: string | number]: string }, ...args: IClassNames.ArgumentArray): string {
    let classes: (string | number)[] = [];

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        if (!arg) continue;

        if (typeof arg === 'string' || typeof arg === 'number') {
            classes.push((this && this[arg as string]) || arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(this, arg));
        } else if (typeof arg === 'object') {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
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
