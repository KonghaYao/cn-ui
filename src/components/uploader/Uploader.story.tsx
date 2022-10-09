export const Controller = [];

import { atom } from '@cn-ui/use';
import { Uploader } from '.';
export default () => {
    const Files = atom([]);
    return (
        <>
            <Uploader Files={Files}></Uploader>
        </>
    );
};
