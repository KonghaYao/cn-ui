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

    export type Radio = Omit<Select, 'type'> & { type: 'radio' };
    export interface Switch<T = boolean> extends baseProp<T>, WithDefault<T> {
        type: 'switch';
    }
    export interface Range<T = number> extends baseProp<T>, WithDefault<T> {
        type: 'range';
        unit?: string;
    }
    export type Slider = Omit<Range, 'type'> & { type: 'slider' };
    export interface Color<T = string> extends baseProp<T>, WithDefault<T> {
        type: 'color';
    }
    export interface Rate<T = number> extends baseProp<T>, WithDefault<T> {
        type: 'rate';
    }
    export interface Text<T = string> extends baseProp<T>, WithDefault<T> {
        type: 'text';
    }
}
