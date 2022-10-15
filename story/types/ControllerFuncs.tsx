export namespace ControllerFuncs {
    export interface ExtraSystemMessage {
        onChange: <T>(key: string, value: T) => void;
    }
    export interface commonProp {
        prop: string;
    }
    export type baseProp = ExtraSystemMessage & commonProp;
    export type WithDefault<T> = {
        default?: T;
        defaultValue?: T;
    };
    export interface Select extends baseProp, WithDefault<string> {
        type: 'select';
        options: { value: string; label?: string }[];
    }
    export interface Switch extends baseProp, WithDefault<boolean> {
        type: 'switch';
    }
    export interface Range extends baseProp, WithDefault<string | number> {
        type: 'switch';
        unit?: string;
    }
}
