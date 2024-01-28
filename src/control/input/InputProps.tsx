import { JSXElement } from 'solid-js'
import { BaseInputProps, CountConfig } from './BaseInput'

interface InputProps extends BaseInputProps {
    addonAfter?: JSXElement // The label text displayed after (on the right side of) the input field
    addonBefore?: JSXElement // The label text displayed before (on the left side of) the input field
    allowClear?: boolean | { clearIcon: JSXElement } // If allow to remove input content with clear icon
    showCount?: boolean | { formatter: (info: { value: string; count: number; maxLength?: number }) => JSXElement } // Whether to show character count
    count?: CountConfig // Character count config
    maxLength?: number // The maximum number of characters in Input
    minLength?: number // The maximum number of characters in Input
    status?: 'error' | 'warning' // Set validation status
    size?: 'large' | 'middle' | 'small' // The size of the input box. Note: in the context of a form, the middle size is used
    type?: string // The type of input, see: MDN (use Input.TextArea instead of type="textarea")
    variant?: 'outlined' | 'borderless' | 'filled' // Variants of Input

    onChange?: (e: any) => void // Callback when user input
    onPressEnter?: (e: any) => void // The callback function that is triggered when Enter key is pressed
}
