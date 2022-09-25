import { Icon } from '../Icon';
import { Avatar } from './index';
export const Controller = [
    {
        type: 'switch',
        default: true,
        prop: 'autoFixFontSize',
    },
    {
        type: 'select',
        default: 'circle',
        prop: 'shape',
        options: ['circle', 'square'].map((i) => ({ value: i })),
    },
    {
        type: 'range',
        default: '36px',
        prop: 'size',
        unit: 'px',
    },
];
export default (props) => {
    return (
        <>
            <Avatar {...props}>江夏尧</Avatar>
            <Avatar {...props}>
                <Icon name="camera"></Icon>
            </Avatar>
            <Avatar
                {...props}
                src="https://foruda.gitee.com/avatar/1663940152493388167/5342313_dongzhongzhidong_1663940152.png"
            ></Avatar>
        </>
    );
};
