import { fireEvent, render } from '@solidjs/testing-library'
import { describe } from 'vitest'
import { OriginComponent } from '../OriginComponent'
import { atom, extendsEvent, sleep } from '../..'
import { JSXElement } from 'solid-js'

describe('extendsEvent', () => {
    it('should extract event keys from props', () => {
        const events = {
            onMount: () => {},
            onClick: () => {},
            onDeselect: () => {}
        }
        const props = {
            ...events,
            otherProp: 'test'
        }

        const result = extendsEvent(props)

        expect(result).toEqual(events)
    })

    it('should ignore props that are not event keys', () => {
        const props = {
            onMount: () => {},
            onClick: () => {},
            onDeselect: () => {},
            otherProp: 'test'
        }

        const result = extendsEvent(props)

        expect((result as any).otherProp).toBeUndefined()
    })

    it('should return an empty object when no event keys are present in props', () => {
        const props = {
            otherProp: 'test'
        }

        const result = extendsEvent(props)

        expect(result).toEqual({})
    })
    test('extend events in child', async () => {
        const WrappedComp = OriginComponent<{
            onInput: () => void
        }>((props) => {
            return <input type="text" {...extendsEvent(props)}></input>
        })

        const data = atom('12')
        const dom = render(() => {
            return <WrappedComp class="my-class" onInput={() => data('hello world')}></WrappedComp>
        })
        fireEvent.input(dom.getByRole('textbox'), { target: { value: 'hello world' } })
        await sleep(0) // 推迟执行
        expect(data()).toBe('hello world')
    })
})
