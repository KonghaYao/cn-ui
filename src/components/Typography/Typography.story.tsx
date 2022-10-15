import { Typography } from '@cn-ui/core';
import { useCodeStyle } from '../Code/useCodeStyle';

export const Controller = [];
import { Demo } from './story/Demo';
export default (props) => {
    const { link } = useCodeStyle('atom-dark');
    return (
        <Typography class="bg-white">
            {Demo()}
            {link}
        </Typography>
    );
};
