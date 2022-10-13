export const Controller = [];

import { atom, reflect } from '@cn-ui/use';
import { Breadcrumb } from '@cn-ui/core';
export default () => {
    const value = atom<string[]>(['Header', 'Channel', 'News']);
    return (
        <>
            <Breadcrumb class="mx-4 my-4 bg-white drop-shadow-xl" list={value}></Breadcrumb>
        </>
    );
};
