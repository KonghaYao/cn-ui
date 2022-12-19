import { atom, reflect } from '@cn-ui/use';

export const Controller = [{ type: 'switch', default: false, prop: 'disabled' }];
const sleep = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });
import { Switch } from '@cn-ui/core';
export default (props) => {
    const val = atom(false);
    return (
        <div class="flex gap-2 p-4">
            <Switch {...props} value={val} onClick={async () => sleep(1000)}></Switch>
            <Switch value={val}></Switch>
        </div>
    );
};
