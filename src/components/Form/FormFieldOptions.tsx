import { Atom } from '@cn-ui/use';

export namespace FormFieldOptions {
    export interface ExtraSystemMessage {
        onChange?: <T>(key: string, value: T) => void;
    }
    export interface commonProp {
        prop: string;
        /** 默认为 prop */
        label?: string;
        valid?: (
            value: unknown,
            total: {
                [key: string]: Atom<unknown>;
            }
        ) => string | void | Promise<string> | Promise<void>;
    }
    export type baseProp = ExtraSystemMessage & commonProp;
    export type WithDefault<T> = {
        default?: T;
    };
    export interface Select extends baseProp, WithDefault<string> {
        type: 'select';
        options: { value: string; label?: string }[];
    }

    export interface Switch extends baseProp, WithDefault<boolean> {
        type: 'switch';
    }
    export interface Range extends baseProp, WithDefault<string | number> {
        type: 'range';
        unit?: string;
    }
}
