import { createEvent, fireEvent, getByTitle, render, screen } from '@solidjs/testing-library'
import { describe } from 'vitest'
import { OriginComponent } from '../OriginComponent'
import { atom, sleep } from '../..'

describe('OriginComponent', () => {
    test('should add style correctly', () => {
        const WrappedComp = OriginComponent((props) => <div style={props.style}>hello</div>)

        const { getByText } = render(() => (
            <WrappedComp
                style={{
                    color: 'red',
                    'font-size': '16px'
                }}
            />
        ))
        expect(getByText('hello').getAttribute('style')).toBe('color: red; font-size: 16px;')
    })

    test('should add class correctly', () => {
        const WrappedComp = OriginComponent((props) => <div class={props.class('info')}>hello</div>)

        const { getByText } = render(() => <WrappedComp class="my-class" />)
        expect(getByText('hello').getAttribute('class')).toBe('my-class info')
    })
    test('v-model', async () => {
        const WrappedComp = OriginComponent((props) => {
            return <input {...props.$input()} onInput={(e) => console.log(e.target.value)}></input>
        })

        const data = atom('12')
        const dom = render(() => {
            return <WrappedComp class="my-class" v-model={data}></WrappedComp>
        })
        fireEvent.input(dom.getByRole('textbox'), { target: { value: 'hello world' } })
        await sleep(0) // 推迟执行
        expect(data()).toBe('hello world')
    })
})
