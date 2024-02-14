import type { StrictArgTypes } from '@storybook/types'
import type { PropDef, ArgTypesExtractor } from '@storybook/docs-tools'
import { extractProps } from './extractProps'
import { createControl } from './createControl'
export const extractArgTypes: ArgTypesExtractor = (component) => {
    if (component) {
        const { rows } = extractProps(component)
        if (rows) {
            return rows.reduce((acc: StrictArgTypes, row: PropDef) => {
                const { name, description, type, sbType, defaultValue: defaultSummary, jsDocTags, required } = row

                acc[name] = {
                    name,
                    description,
                    type: { required, ...sbType },
                    table: {
                        type,
                        jsDocTags,
                        defaultValue: defaultSummary
                    },
                    ...createControl(sbType, name)
                }
                return acc
            }, {})
        }
    }

    return null
}
