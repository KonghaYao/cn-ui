import { Typography } from '@cn-ui/core';
import { useCodeStyle } from '@cn-ui/highlight';
export const Controller = [];
import { Demo } from './Typo/Demo';
export default (props) => {
    const { link } = useCodeStyle('github-dark');
    return (
        <Typography class="bg-white">
            {Demo()}
            {link}
        </Typography>
    );
};
