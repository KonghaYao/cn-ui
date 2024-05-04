import { OriginComponent, ensureFunctionResult, extendsComponents } from "@cn-ui/reactive";
import { Result, type ResultProps } from "../Result";
import { EmptySVG } from "./EmptySVG";

export const Empty = OriginComponent<ResultProps>((props) => {
    return (
        <Result
            title="No Data"
            {...extendsComponents(props)}
            header={() => {
                if (props.header) return ensureFunctionResult(props.header);
                return <EmptySVG></EmptySVG>;
            }}
        ></Result>
    );
});
