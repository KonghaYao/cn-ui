export const Controller = [];

import { atom, reflect } from '@cn-ui/use';
import { Breadcrumb } from '@cn-ui/core';
export default () => {
    const value = atom<string[]>(['Header', 'Channel', 'News']);
    return (
        <>
            <Breadcrumb
                class="mx-4 my-4 "
                list={value}
                onTrigger={(arr, text, index) => {
                    console.log(arr, text, index);
                }}
            ></Breadcrumb>
        </>
    );
};
