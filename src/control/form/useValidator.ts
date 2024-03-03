import Schema from 'async-validator'
import { RootColumnDef, getKeyFromRootColumnDef } from './utils'
import { createMemo } from 'solid-js'
import { RuleItem } from 'async-validator'
import { ensureArrayReturn } from '@cn-ui/reactive'

/** 用于表单校验的规则构建 */
export const useValidator = <T, D>(config: RootColumnDef<T, D>[], originData: T, index: number) => {
    const validator = createMemo(() => {
        const schema = Object.fromEntries(
            config.reduce((col, column) => {
                let rules = []
                if ('required' in column && column.required) {
                    rules.push({
                        required: true
                    })
                }
                if ('rules' in column && column.rules) {
                    rules.push(...ensureArrayReturn(column.rules))
                }
                if (rules.length) col.push([getKeyFromRootColumnDef(column, originData, index), rules])
                return col
            }, [] as [string, RuleItem[] | RuleItem][])
        )
        return new Schema(schema)
    })

    return { validator }
}
