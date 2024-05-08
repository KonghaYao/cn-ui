import { type Atom, OriginComponent, atom, classHelper, classNames } from "@cn-ui/reactive";
import { AiOutlineEllipsis, AiOutlineLeft, AiOutlineRight } from "solid-icons/ai";
import { For, Index, Show } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { Icon } from "../icon/Icon";

import "../animation/fade.css";
import { type UseViewingPaginationOptions, useViewingPagination } from "./useViewingPagination";
export interface PaginationProps extends UseViewingPaginationOptions {
    pageSizeModel?: Atom<number>;
}
export const Pagination = OriginComponent<PaginationProps, HTMLDivElement, number>((props) => {
    const pageSizeModel = props.pageSizeModel ?? atom(10);
    const baseBtn =
        "h-8 w-8 bg-transparent mx-1 text-center hover:bg-design-hover rounded-md  cursor-pointer transition-colors";
    const pageControl = useViewingPagination({
        ...props,
        page: props.model,
        setPage: props.model,
        pageSize: pageSizeModel(),
        setPageSize: pageSizeModel,
    });
    return (
        <div class="flex gap-4 select-none">
            <Icon
                aria-label="prev page"
                onclick={pageControl.prev}
                class={classHelper.base(baseBtn)(pageControl.isFirstPage() && "", "")}
            >
                <AiOutlineLeft />
            </Icon>
            <Show when={pageControl.viewingPages()[0] !== 1}>
                <Icon>
                    <AiOutlineEllipsis />
                </Icon>
            </Show>
            <TransitionGroup name="cn-fade">
                <For each={pageControl.viewingPages()}>
                    {(page) => {
                        return (
                            <button
                                type="button"
                                disabled={pageControl.isCurrentPage(page)}
                                class={classNames(
                                    baseBtn,
                                    pageControl.isCurrentPage(page) &&
                                        "border-blue-600 border text-blue-600",
                                )}
                                onclick={() => {
                                    pageControl.setCurrentPage(page);
                                }}
                            >
                                {page}
                            </button>
                        );
                    }}
                </For>
            </TransitionGroup>
            <Show when={pageControl.viewingPages().at(-1) !== pageControl.pageCount()}>
                <Icon>
                    <AiOutlineEllipsis />
                </Icon>
            </Show>
            <Icon
                aria-label="next page"
                class={classHelper.base(baseBtn)(pageControl.isFirstPage() && "", "")}
                onclick={pageControl.next}
            >
                <AiOutlineRight />
            </Icon>
        </div>
    );
});
