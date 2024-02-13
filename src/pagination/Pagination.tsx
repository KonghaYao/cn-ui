import { Pagination as P } from '@ark-ui/solid'
import { AiOutlineEllipsis, AiOutlineLeft, AiOutlineRight } from 'solid-icons/ai'
import { For, onMount } from 'solid-js'
import { Icon } from '../icon/Icon'
import { OriginComponent, classNames } from '@cn-ui/reactive'
export interface PaginationProps {
    count: number
    pageSize?: number
    onPageChange?: (details: { page: number; pageSize: number }) => void
}
export const Pagination = OriginComponent<PaginationProps, HTMLDivElement, number>((props) => {
    const baseBtn = 'h-8 w-8 bg-design-ground text-center hover:bg-design-hover rounded-md  cursor-pointer transition-colors'
    return (
        <P.Root
            class="flex"
            count={props.count ?? 100}
            page={props.model() ?? 1}
            pageSize={props.pageSize ?? 10}
            siblingCount={3}
            onPageChange={(detail) => {
                props.model(detail.page)
                props.onPageChange?.(detail)
            }}
        >
            {(api) => (
                <>
                    <P.PrevTrigger class={baseBtn}>
                        <Icon>
                            <AiOutlineLeft></AiOutlineLeft>
                        </Icon>
                    </P.PrevTrigger>
                    <For each={api().pages}>
                        {(page, index) => {
                            return page.type === 'page' ? (
                                <P.Item class={classNames(baseBtn, api().page === page.value && 'border-blue-600 border text-blue-600')} {...page}>
                                    {page.value}
                                </P.Item>
                            ) : (
                                <P.Ellipsis class={classNames(baseBtn, 'flex items-center justify-center')} index={index()}>
                                    <Icon>
                                        <AiOutlineEllipsis></AiOutlineEllipsis>
                                    </Icon>
                                </P.Ellipsis>
                            )
                        }}
                    </For>
                    <P.NextTrigger class={baseBtn}>
                        <Icon>
                            <AiOutlineRight />
                        </Icon>
                    </P.NextTrigger>
                </>
            )}
        </P.Root>
    )
})
