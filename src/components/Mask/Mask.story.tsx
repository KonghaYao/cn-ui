import { Avatar } from '../Avatar/index';
import { Icon } from '../Icon';
import { Mask, Position } from './index';
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
            <Mask {...props}>
                <Avatar
                    src="https://foruda.gitee.com/avatar/1663940152493388167/5342313_dongzhongzhidong_1663940152.png"
                    size={60}
                ></Avatar>
                <Position right="0" bottom="0">
                    <div
                        style={{
                            background: '#00000099',
                            color: 'white',
                            'border-radius': '4px',
                        }}
                    >
                        <Icon name="camera"></Icon>
                    </div>
                </Position>
            </Mask>
            <Mask {...props}>
                <Avatar
                    src="https://foruda.gitee.com/avatar/1663940152493388167/5342313_dongzhongzhidong_1663940152.png"
                    size={60}
                    shape="square"
                ></Avatar>
                <Position full right="0" bottom="0">
                    <div
                        style={{
                            background: '#00000099',
                            height: '100%',
                            color: 'white',
                            display: 'flex',
                            'justify-content': 'center',
                            'align-items': 'center',
                        }}
                    >
                        <Icon name="camera"></Icon>
                    </div>
                </Position>
            </Mask>
        </>
    );
};
