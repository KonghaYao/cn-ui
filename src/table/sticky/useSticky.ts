import { atom, computed } from '@cn-ui/reactive'
import { MagicColumnConfig } from '../'
import { Accessor, createEffect } from 'solid-js'
import { defaultRangeExtractor, Range } from '@tanstack/solid-virtual'
import { Table } from '@tanstack/solid-table'
import { indexConfig } from '../defaultConfig'

export const useSticky = <T>(table: Table<T>) => {
    return {
        rangeExtractor: (range: Range) => {
            const r = [...defaultRangeExtractor(range)]
            return r
        }
    }
}
