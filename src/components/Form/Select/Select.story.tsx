import { atom, reflect } from '@cn-ui/use';
import { Icon } from '../../Icon';

export const Controller = [{ type: 'switch', default: false, prop: 'disabled' }];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
import { Select } from './Select';
export default (props) => {
    const val = atom('');
    const options = atom(
        [...Array(10).keys()].flatMap((i) => [
            'Beijing',
            'Shanghai',
            'Guangzhou',
            'Disabled',
            '343'.repeat(10),
            '232312',
            '323232',
        ])
    );
    return (
        <div>
            <Select {...props} value={val} options={options}></Select>
        </div>
    );
};
