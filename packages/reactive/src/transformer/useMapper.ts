import { computed } from '../atom/reflect'

/**
 * switch 逻辑的简化设计模式
 * @example
 * const direction = useMapper(props.direction ?? 'col', {
 *     row: 'flex-row',
 *     col: 'flex-col'
 * })
 */
export function useMapper<T extends keyof D, D>(type: T | (() => T), Mapper: D) {
    return computed(() => (typeof type === 'function' ? Mapper[type()] : Mapper[type]))
}
