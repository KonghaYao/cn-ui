import { Typography, useCodeStyle } from '@cn-ui/core';

export const Controller = [];
import { Demo } from './story/Demo';
export default (props) => {
    const { link } = useCodeStyle('github-dark');
    return (
        <Typography class="bg-white">
            {Demo()}
            {link}
        </Typography>
    );
};
