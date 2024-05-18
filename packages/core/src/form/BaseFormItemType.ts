/** 每一个表单项的类型都具有的基础属性 */
export interface BaseFormItemType {
    /** 兼容 form 表单的 name 属性 */
    name?: string;
    /** 无值时的提示 */
    placeholder?: string;
    /** 禁止操作 */
    disabled?: boolean;
    /** 只读状态, 保证控件不会被输入控制 */
    readonly?: boolean;
    /** 强制必填 */
    required?: boolean;

    /** 数据错误状态 */
    error?: boolean;

    onValueChange?: (e: Event, value: any) => void;
}

export const extendsBaseFormItemProp = (props: BaseFormItemType) => {
    return {
        name: props.name,
        placeholder: props.placeholder,
        readonly: props.readonly,
        disabled: props.disabled,
        required: props.required,
        error: props.error,
    };
};
