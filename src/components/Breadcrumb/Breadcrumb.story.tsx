export const Controller = [];

import { atom, reflect } from '@cn-ui/use';
import { Breadcrumb } from '@cn-ui/core';
export default () => {
    const value = atom<string[]>(['1', '2']);
    return (
        <>
            <Breadcrumb list={value}></Breadcrumb>
        </>
    );
};
