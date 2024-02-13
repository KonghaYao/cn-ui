import { computed } from '../atom/reflect'
import { ensureFunctionResult } from '../utils'

/**
 * switch 逻辑的简化设计模式
 * @example
 * const direction = useMapper(props.direction ?? 'col', {
 *     row: 'flex-row',
 *     col: ()=> 'flex-col'
 * })
 */
export function useMapper<T extends keyof D, D extends Record<string, unknown | ((this: D) => unknown)>>(type: T | (() => T), Mapper: D) {
    return computed(() => ensureFunctionResult(typeof type === 'function' ? Mapper[type()] : Mapper[type], undefined, Mapper))
}
