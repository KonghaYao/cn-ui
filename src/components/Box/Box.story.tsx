import { Box } from './index';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'wrap',
    },
    {
        type: 'switch',
        default: false,
        prop: 'vertical',
    },

    {
        type: 'select',
        default: 'medium',
        prop: 'size',
        options: ['mini', 'small', 'medium', 'large'].map((i) => ({
            value: i,
        })),
    },
];

import 'animate.css/source/fading_entrances/fadeInDown.css';
import 'animate.css/source/fading_exits/fadeOutUp.css';
import { Icon } from '../Icon';
import { Image } from '../Image';
import { Result } from './Result';
export default (props) => {
    const baseStyle = { height: '200px', width: '100%' };
    return (
        <>
            <div style={baseStyle}>
                <Box
                    icon={
                        <Image
                            src="https://doodleipsum.com/700x525/hand-drawn?i=dee23ea78d4bed889e6b2c07f25f3a13"
                            style={{ 'max-width': '70%', 'max-height': '70%', overflow: 'hidden' }}
                        ></Image>
                    }
                    subTitle="数据为空"
                ></Box>
            </div>
            <div style={baseStyle}>
                <Result icon="success" title="数据为空"></Result>
            </div>
            <div style={baseStyle}>
                <Result icon="error" title="数据为空"></Result>
            </div>
            <div style={baseStyle}>
                <Result icon="info" title="数据为空"></Result>
            </div>
            <div style={baseStyle}>
                <Result icon="warning" title="数据为空"></Result>
            </div>
        </>
    );
};
