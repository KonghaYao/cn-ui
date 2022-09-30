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
export default (props) => {
    return (
        <>
            <div style={{ height: '200px', width: '100%' }}>
                <Box
                    icon={<Icon name="error" size={50} class="text-red-400"></Icon>}
                    description="发生了错误"
                ></Box>
            </div>
            <div style={{ height: '200px', width: '100%' }}>
                <Box
                    icon={
                        <Image
                            src="https://doodleipsum.com/700x525/hand-drawn?i=dee23ea78d4bed889e6b2c07f25f3a13"
                            style={{ 'max-width': '70%', 'max-height': '70%', overflow: 'hidden' }}
                        ></Image>
                    }
                    description="数据为空"
                ></Box>
            </div>
        </>
    );
};
