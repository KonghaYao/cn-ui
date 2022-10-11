export const Controller = [
    { type: 'switch', default: false, prop: 'disabled' },
    { type: 'switch', default: true, prop: 'score' },
];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
import { Password } from '@cn-ui/core';
export default (props) => {
    return (
        <div>
            <Password {...props}></Password>
        </div>
    );
};
