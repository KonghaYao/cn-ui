import { atom, reflect } from '@cn-ui/use';
import { Icon } from '../../Icon';

export const Controller = [{ type: 'switch', default: false, prop: 'disabled' }];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
import { Switch } from './Switch';
export default (props) => {
    const val = atom(false);
    return (
        <div>
            <Switch {...props} value={val} onClick={async () => sleep(1000)}></Switch>
            <Switch value={val}></Switch>
        </div>
    );
};
