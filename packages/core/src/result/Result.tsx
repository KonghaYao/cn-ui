import { type JSXSlot, ensureFunctionResult } from "@cn-ui/reactive";
import { Flex } from "../container";

export interface ResultProps {
    header?: JSXSlot;
    title: string;
    subTitle?: string;
    footer?: JSXSlot;
}
export const Result = (props: ResultProps) => {
    return (
        <Flex {...props} justify="center" align="center" vertical>
            {ensureFunctionResult(props.header)}
            <h2 class="text-2xl pt-2">{props.title}</h2>
            <small class="text-gray-400 text-lg">{props.subTitle}</small>
            {ensureFunctionResult(props.footer)}
        </Flex>
    );
};
