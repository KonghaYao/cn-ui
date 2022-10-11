import { Icon } from '@cn-ui/core';
import { Link } from '@cn-ui/core';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'disabled',
    },
    {
        type: 'switch',
        default: true,
        prop: 'hoverable',
    },

    {
        type: 'select',
        default: 'default',
        prop: 'status',
        options: ['warning', 'danger', 'success'].map((i) => ({
            value: i,
        })),
    },
];
export default (props) => {
    return (
        <>
            <Link {...props}>Link</Link>
            <Link icon={true} {...props}>
                Link
            </Link>
            <Link icon={<Icon name="yard"></Icon>} {...props}>
                Link
            </Link>
        </>
    );
};
