import { atom, reflect } from '@cn-ui/use';

export const Controller = [{ type: 'switch', default: false, prop: 'disabled' }];
const sleep = (ms: number) =>
    new Promise((resolve) => {
        console.log('异步等待');
        setTimeout(() => {
            resolve(null);
            console.log('等待结束');
        }, ms);
    });
import { Switch } from '@cn-ui/core';
export default (props) => {
    const val = atom(false);
    return (
        <div>
            <Switch {...props} value={val} onClick={async () => sleep(1000)}></Switch>
            <Switch value={val}></Switch>
        </div>
    );
};
