export const Controller = [
    { type: 'switch', default: false, prop: 'disabled' },
    { type: 'switch', default: true, prop: 'score' },
];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
import { Password } from '@cn-ui/core';
import { PasswordScore } from '@cn-ui/password-score';
export default (props) => {
    return (
        <div>
            <Password {...props}></Password>
        </div>
    );
};
