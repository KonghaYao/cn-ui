import { AC, ArrayFolder, DebounceAtom, atom, computed, resource } from '@cn-ui/reactive'
import { BaseInput } from '../control/input'
import Fuse from 'fuse.js'

import { Tabs, Tab } from '../tabs'
import { Dynamic } from 'solid-js/web'
import { Component, Show } from 'solid-js'
import { watch } from 'solidjs-use'
const loader = {
    Ai: () => import('solid-icons/ai'),
    Bs: () => import('solid-icons/bs'),
    Bi: () => import('solid-icons/bi'),
    Fi: () => import('solid-icons/fi'),
    Fa: () => import('solid-icons/fa'),
    Hi: () => import('solid-icons/hi'),
    Im: () => import('solid-icons/im'),
    Io: () => import('solid-icons/io'),
    Ri: () => import('solid-icons/ri'),
    Si: () => import('solid-icons/si'),
    Ti: () => import('solid-icons/ti'),
    Vs: () => import('solid-icons/vs'),
    Wi: () => import('solid-icons/wi'),
    Cg: () => import('solid-icons/cg'),
    Tb: () => import('solid-icons/tb'),
    Oc: () => import('solid-icons/oc')
} as unknown as Record<string, () => Promise<Record<string, Component>>>
export const IconSearch = () => {
    const searchText = atom('')
    const searchKey = DebounceAtom(searchText, 500)
    const size = atom('32')

    const watchingTab = atom('Ai')

    const pack = resource(() => loader[watchingTab()](), { initValue: {} })
    const totalAvailable = computed(() =>
        Object.keys(pack())
            .filter((i) => i !== 'default')
            .map((i) => ({ label: i }))
    )
    const fuse = computed(() => new Fuse<{ label: string }>(totalAvailable(), { keys: ['label'] }))
    const result = computed(() => {
        if (!searchKey()) return totalAvailable()
        return fuse()
            .search(searchKey())
            .map((i) => i.item)
    })
    watch(watchingTab, () => {
        pack.refetch()
    })
    return (
        <div class="h-[90vh]">
            <BaseInput v-model={searchText} suffixIcon={`${result().length} / ${totalAvailable().length}`}></BaseInput>
            <BaseInput v-model={size} suffixIcon={`${result().length} / ${totalAvailable().length}`}></BaseInput>
            <Tabs class="h-full" wrapperClass="h-full" v-model={watchingTab}>
                {Object.keys(loader).map((key) => {
                    return (
                        <Tab name={key} class="h-full">
                            <AC resource={pack}>
                                {() => {
                                    return (
                                        <Show when={key === watchingTab()}>
                                            <IconGallery comps={pack()} result={result()} size={size()}></IconGallery>
                                        </Show>
                                    )
                                }}
                            </AC>
                        </Tab>
                    )
                })}
            </Tabs>
        </div>
    )
}
import copy from 'copy-to-clipboard'
import { VirtualList } from '../virtualList'
const IconGallery = (props: { comps: Record<string, Component>; result: { label: string }[]; size: string | number }) => {
    return (
        <VirtualList each={ArrayFolder(props.result.map((i) => ({ ...i, comp: props.comps[i.label] })).filter((i) => i.comp))}>
            {(row) => {
                return (
                    <div class="grid grid-cols-10">
                        {row.map((i) => {
                            return (
                                <div
                                    title={i.label}
                                    class="shadow-xs hover:shadow-lg transition p-4 rounded-lg flex aspect-square justify-center items-center"
                                    ondblclick={() => copy(i.label)}
                                >
                                    <Dynamic component={i.comp} size={parseInt(props.size)}></Dynamic>
                                </div>
                            )
                        })}
                    </div>
                )
            }}
        </VirtualList>
    )
}
