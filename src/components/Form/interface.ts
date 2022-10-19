import { Atom } from '@cn-ui/use';
import { JSX } from 'solid-js';

export interface FormField<T = unknown> extends JSX.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value: T | Atom<T>;
}
