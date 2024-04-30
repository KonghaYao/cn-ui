import { OriginComponent, classHelper, extendsComponents } from "@cn-ui/reactive";
import type { JSXElement } from "solid-js";
import { Flex } from "../container";
import { Icon } from "../icon";
import { Result, type ResultProps } from "./Result";
import { useResultIcon, type useResultProps, useResultState } from "./useResult";

export const ResultStateCircle = (props: { children?: JSXElement } & useResultProps) => {
    const { classMapper } = useResultState(props);
    const { iconMapper } = useResultIcon(props);
    return (
        <Flex class={classHelper.base("w-24 h-24 rounded-full")(classMapper().subBg)}>
            <Icon
                class={classHelper.base(
                    "w-18 h-18 rounded-full text-design-pure justify-center",
                    classMapper().bg,
                )("")}
            >
                {iconMapper() ?? props.children}
            </Icon>
        </Flex>
    );
};

export const ResultAlert = OriginComponent<ResultProps & useResultProps>((props) => {
    return (
        <Result
            {...extendsComponents(props)}
            header={() => <ResultStateCircle {...props}></ResultStateCircle>}
        ></Result>
    );
});
