import { Component, JSX, JSXElement, Match, Switch } from 'solid-js';
import { OriginComponent } from '@cn-ui/use';
type stringTag = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
interface ResultProps extends Omit<BoxProps, 'icon'> {
    icon: stringTag | JSX.FunctionElement | JSX.ArrayElement;
}
import { Box, BoxProps } from './index';
import { Icon } from '../Icon';

const CompMap = new Map<stringTag, JSXElement>([['success', () => <Icon name="check"></Icon>]]);
/**
 * @zh Result 是状态标识页面
 */
export const Result = OriginComponent<ResultProps, HTMLDivElement>((props) => {
    const IconComp = typeof props.icon === 'string' ? CompMap.get(props.icon) : props.icon;
    return <Box {...props} icon={IconComp}></Box>;
});
