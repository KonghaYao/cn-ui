import { Atom } from '@cn-ui/use';

export namespace FormFieldOptions {
    export interface ExtraSystemMessage {
        onChange?: <T>(key: string, value: T) => void;
    }
    export interface commonProp<T> {
        prop: string;
        /** 默认为 prop */
        label?: string;

        valid?: (
            value: T,
            total: {
                [key: string]: Atom<unknown>;
            }
        ) => string | void | Promise<string> | Promise<void>;
    }
    export type baseProp<T> = ExtraSystemMessage & commonProp<T>;
    export type WithDefault<T> = {
        default?: T;
    };
    export interface Select<T = { value: string; label?: string }>
        extends baseProp<T>,
            WithDefault<string> {
        type: 'select';
        options: T[];
    }

    export interface Switch<T = boolean> extends baseProp<T>, WithDefault<T> {
        type: 'switch';
    }
    export interface Range<T = string> extends baseProp<T>, WithDefault<string | number> {
        type: 'range';
        unit?: string;
    }
    export interface Color<T = string> extends baseProp<T>, WithDefault<T> {
        type: 'color';
    }
    export interface Rate<T = number> extends baseProp<T>, WithDefault<T> {
        type: 'rate';
    }
}
