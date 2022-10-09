export const Controller = [];

import { atom, reflect } from '@cn-ui/use';
import { Breadcrumb } from './Breadcrumb';
export default () => {
    const value = atom<string[]>(['1', '2']);
    return (
        <>
            <Breadcrumb list={value}></Breadcrumb>
        </>
    );
};
