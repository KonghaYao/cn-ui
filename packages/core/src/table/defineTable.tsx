import type { SelectOptionsType } from "@cn-ui/reactive";
import type { RuleItem } from "async-validator";

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
        fixed?: "left" | "right";
        options?: SelectOptionsType[];
        span?: number;
        rules?: RuleItem[] | RuleItem;
        required?: boolean;
    }
}
