import { Accessor, For, JSX, JSXElement } from 'solid-js'

import { OriginComponent, classNames, useMapper } from '@cn-ui/reactive'
import { TabsContext } from './Tabs'

export interface TabsHeaderProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
    children?: (props: string, index: Accessor<number>) => JSXElement
}
export const TabsHeader = OriginComponent<TabsHeaderProps, HTMLDivElement>((props) => {
    const { isSelected, allRegistered, changeSelected } = TabsContext.use()!
    // TODO Tab 增删
    // TODO disabled 状态
    return (
        <div class={props.class('cn-tabs-header flex gap-5 border-b-2 border-gray-200')}>
            <For each={[...allRegistered()]}>
                {typeof props.children === 'function'
                    ? props.children
                    : (name) => {
                          const color = useMapper(() => isSelected(name).toString() as 'true' | 'false', {
                              true: 'text-blue-400',
                              false: ''
                          })
                          return (
                              <button
                                  class={classNames('bg-transparent h-10 border-none hover:text-blue-400 transition-all', color())}
                                  onClick={() => changeSelected(name, true)}
                              >
                                  {name}
                              </button>
                          )
                      }}
            </For>
            {/* 这里需要多一个插槽 */}
        </div>
    )
})
