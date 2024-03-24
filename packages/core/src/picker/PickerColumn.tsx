/**
 * 模仿自 Vant 项目 Picker 进行了 Solidjs 适配
 */
import { useEventListener, watch } from 'solidjs-use'
import { useTouch } from './useTouch'
import { NullAtom, OriginComponent, OriginDiv, atom, computed, toCSSPx } from '@cn-ui/reactive'
import { For, createEffect, mergeProps } from 'solid-js'
import { SelectItemsType } from '../select'

/** clamps number within the inclusive lower and upper bounds */
export const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max)
export function getElementTranslateY(element: Element) {
    const { transform } = window.getComputedStyle(element)
    const translateY = transform.slice(7, transform.length - 1).split(', ')[5]
    return Number(translateY)
}
export function findIndexOfEnabledOption(options: PickerColumnProps['options'], index: number) {
    index = clamp(index, 0, options.length)

    for (let i = index; i < options.length; i++) {
        if (!options[i].disabled) return i
    }
    for (let i = index - 1; i >= 0; i--) {
        if (!options[i].disabled) return i
    }

    return 0
}

const DEFAULT_DURATION = 200
const MOMENTUM_TIME = 300
const MOMENTUM_DISTANCE = 15

export interface PickerColumnProps {
    options: SelectItemsType[]
    readonly?: boolean
    /** 单个选项高度 */
    optionHeight?: number
    /** 可视范围内的选项数 */
    visibleOptionNum?: number
    swipeDuration?: number
}
export const PickerColumn = OriginComponent<PickerColumnProps, HTMLDivElement, PickerColumnProps['options'][number] | null>((_props) => {
    const props = mergeProps(
        {
            optionHeight: 44,
            swipeDuration: 1000,
            visibleOptionNum: 6
        },
        _props
    )
    let moving: boolean
    let startOffset: number
    let touchStartTime: number
    let momentumOffset: number
    let transitionEndTrigger: null | (() => void)

    const root = NullAtom<HTMLElement>(null)
    const wrapper = NullAtom<HTMLElement>(null)
    const currentOffset = atom(0)
    const currentDuration = atom(0)
    const touch = useTouch()

    const count = () => props.options.length

    const baseOffset = () => (props.optionHeight * (+props.visibleOptionNum - 1)) / 2

    const updateValueByIndex = (index: number) => {
        let enabledIndex = findIndexOfEnabledOption(props.options, index)
        const offset = -enabledIndex * props.optionHeight

        const trigger = () => {
            if (enabledIndex > count() - 1) {
                enabledIndex = findIndexOfEnabledOption(props.options, index)
            }

            const value = props.options[enabledIndex]
            if (value.value !== props.model()?.value) {
                props.model(value)
                // emit('change', value);
            }
        }

        // trigger the change event after transitionend when moving
        if (moving && offset !== currentOffset()) {
            transitionEndTrigger = trigger
        } else {
            trigger()
        }

        currentOffset(offset)
    }

    const isReadonly = () => props.readonly || !props.options.length

    const onClickOption = (index: number) => {
        if (moving || isReadonly()) {
            return
        }
        transitionEndTrigger = null
        currentDuration(DEFAULT_DURATION)
        updateValueByIndex(index)
        // emit('clickOption', props.options[index]);
    }

    const getIndexByOffset = (offset: number) => clamp(Math.round(-offset / props.optionHeight), 0, count() - 1)

    const currentIndex = computed(() => getIndexByOffset(currentOffset()))

    const momentum = (distance: number, duration: number) => {
        const speed = Math.abs(distance / duration)

        distance = currentOffset() + (speed / 0.003) * (distance < 0 ? -1 : 1)

        const index = getIndexByOffset(distance)

        currentDuration(+props.swipeDuration)
        updateValueByIndex(index)
    }

    const stopMomentum = () => {
        moving = false
        currentDuration(0)

        if (transitionEndTrigger) {
            transitionEndTrigger()
            transitionEndTrigger = null
        }
    }

    const onTouchStart = (event: TouchEvent) => {
        if (isReadonly()) {
            return
        }

        touch.start(event)

        if (moving) {
            const translateY = getElementTranslateY(wrapper()!)
            currentOffset(Math.min(0, translateY - baseOffset()))
        }

        currentDuration(0)
        startOffset = currentOffset()
        touchStartTime = Date.now()
        momentumOffset = startOffset
        transitionEndTrigger = null
    }

    const onTouchMove = (event: TouchEvent) => {
        if (isReadonly()) {
            return
        }
        touch.move(event)

        if (touch.isVertical()) {
            moving = true
            event.preventDefault()
        }

        const newOffset = clamp(startOffset + touch.deltaY(), -(count() * props.optionHeight), props.optionHeight)

        const newIndex = getIndexByOffset(newOffset)
        if (newIndex !== currentIndex()) {
            // emit('scrollInto', props.options[newIndex]);
        }

        currentOffset(newOffset)

        const now = Date.now()
        if (now - touchStartTime > MOMENTUM_TIME) {
            touchStartTime = now
            momentumOffset = newOffset
        }
    }

    const onTouchEnd = () => {
        if (isReadonly()) {
            return
        }

        const distance = currentOffset() - momentumOffset
        const duration = Date.now() - touchStartTime
        const startMomentum = duration < MOMENTUM_TIME && Math.abs(distance) > MOMENTUM_DISTANCE

        if (startMomentum) {
            momentum(distance, duration)
            return
        }

        const index = getIndexByOffset(currentOffset())
        currentDuration(DEFAULT_DURATION)
        updateValueByIndex(index)

        // compatible with desktop scenario
        // use setTimeout to skip the click event emitted after touchstart
        setTimeout(() => {
            moving = false
        }, 0)
    }
    const getLabelFromOptions = (option: SelectItemsType) => {
        return option.label ?? option.value
    }

    createEffect(() => {
        const index = moving ? Math.floor(-currentOffset() / props.optionHeight) : props.options.findIndex((option) => option.value === props.model()?.value)
        const enabledIndex = findIndexOfEnabledOption(props.options, index)
        const offset = -enabledIndex * props.optionHeight
        if (moving && enabledIndex < index) stopMomentum()
        currentOffset(offset)
    })

    // useEventListener will set passive to `false` to eliminate the warning of Chrome
    useEventListener(root, 'touchmove', onTouchMove)

    return (
        <OriginDiv
            prop={props}
            class="relative select-none cursor-grab overflow-hidden"
            style={{
                height: toCSSPx(props.visibleOptionNum * props.optionHeight)
            }}
            ref={root}
            ontouchstart={onTouchStart}
            ontouchend={onTouchEnd}
            ontouchcancel={onTouchEnd}
        >
            <div
                class="absolute top-0 left-0 z-1 w-full h-full pointer-events-none"
                style={{
                    'background-image':
                        'linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4)),linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4))',
                    'background-repeat': 'no-repeat',
                    'background-position': 'top, bottom',
                    transform: 'translatez(0)',
                    'background-size': `100% ${(props.optionHeight * +props.visibleOptionNum - props.optionHeight) / 2}px`
                }}
            ></div>
            <div
                class="absolute top-[50%] left-0 z-2 pointer-events-none border-t -translate-y-1/2 border-b w-full border-design-border"
                style={{ height: `${props.optionHeight}px` }}
            ></div>
            <ul
                ref={wrapper}
                style={{
                    transform: `translate3d(0, ${currentOffset() + baseOffset()}px, 0)`,
                    'transition-duration': `${currentDuration()}ms`,
                    'transition-property': currentDuration() ? 'all' : 'none'
                }}
                ontransitionend={stopMomentum}
            >
                <For each={props.options}>
                    {(option, index) => {
                        return (
                            <li
                                class="flex justify-center items-center"
                                tabindex={option.disabled ? -1 : 0}
                                style={{
                                    height: `${props.optionHeight}px`
                                }}
                                onClick={() => onClickOption(index())}
                            >
                                <div>{getLabelFromOptions(option)}</div>
                            </li>
                        )
                    }}
                </For>
            </ul>
        </OriginDiv>
    )
})
