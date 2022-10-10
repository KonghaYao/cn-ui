import { Component, JSX, JSXElement, Match, Switch } from 'solid-js';
import { OriginComponent } from '@cn-ui/use';
type stringTag = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
interface ResultProps extends Omit<BoxProps, 'icon'> {
    icon: stringTag | JSX.FunctionElement | JSX.ArrayElement;
}
import { Box, BoxProps } from './Box';
import { Icon } from '../Icon';
import { DefaultIcon } from '../Icon/DefaultIcon';

const CompMap = new Map<stringTag, JSXElement>([
    ['success', () => <DefaultIcon name="check_circle" color="green" size={50}></DefaultIcon>],
    ['error', () => <DefaultIcon name="close" color="red" size={50}></DefaultIcon>],
    ['info', () => <DefaultIcon name="info" color="blue" size={50}></DefaultIcon>],
    ['warning', () => <DefaultIcon name="info" color="orange" size={50}></DefaultIcon>],
]);
/**
 * @zh Result 是状态标识页面
 */
export const Result = OriginComponent<ResultProps, HTMLDivElement>((props) => {
    const IconComp = typeof props.icon === 'string' ? CompMap.get(props.icon) : props.icon;
    return <Box {...props} icon={IconComp}></Box>;
});
