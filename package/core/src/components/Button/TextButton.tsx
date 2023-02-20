import { OriginComponent } from '@cn-ui/use';
import { TextColor } from '../_util/design';
import { PureButtonProps, PureButton } from './PureButton';

export interface TextButtonProps extends PureButtonProps {
    color?: keyof typeof TextColor;
    gradient?: false;
}
const useColorStyle = (color: keyof typeof TextColor = 'blue') => {
    return TextColor[color];
};
export const TextButton = OriginComponent<TextButtonProps, HTMLButtonElement>((props) => {
    return (
        <PureButton
            {...props}
            class={props.class(useColorStyle(props.color), 'bg-transparent hover:bg-gray-100')}
        ></PureButton>
    );
});
