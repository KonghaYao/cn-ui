import type { SelectOptionsType } from "@cn-ui/reactive";
import type { RuleItem } from "async-validator";

export type PropSlot<T> = (() => T) | T;
declare module "@cn-ui/table-core" {
    interface TableMeta<TData> {
        updateData?: (rowIndex: number, columnId: string, value: any) => void;
    }
    interface ColumnDefBase<TData, TValue = unknown> {
        /** 可编辑表格使用的类型 */
        type?:
            | "text"
            | "number"
            | "date"
            | "date-range"
            | "select"
            | "checkbox"
            | "switch"
            | "radio"
            | "cascader"
            | "switch";
        /** 控制元素的属性注入 */
        control?: any;
        fixed?: "left" | "right";
        options?: SelectOptionsType[];
        rules?: RuleItem[] | RuleItem;

        /** 无值时的提示 */
        placeholder?: PropSlot<string>;
        /** 禁止操作 */
        disabled?: PropSlot<boolean>;
        /** 只读状态, 保证控件不会被输入控制 */
        readonly?: PropSlot<boolean>;
        /** 强制必填 */
        required?: PropSlot<boolean>;
        span?: PropSlot<number>;
        /**
         * @category form
         */
        showLabel?: boolean;
    }
}
