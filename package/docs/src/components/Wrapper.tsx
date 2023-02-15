import { Component, Show, Suspense, createSignal, lazy, onMount } from "solid-js"
import {expose,windowEndpoint} from 'comlink'
import { Dynamic } from "solid-js/web"
export const StroyWrapper = ({Comp}:{Comp:string})=>{
const Content = lazy(()=>import(/* @vite-ignore */ Comp))
    const [Props,setProps] = createSignal({})
    onMount(()=>{
        expose(
            {
                changeProps(props: any) {
                    setProps(props);
                    console.info('receive props', Props());
                    return true;
                },
            },
            windowEndpoint(self.parent)
        );
    })
    return <Suspense>
        <Content {...Props()}></Content>
    </Suspense>
}
