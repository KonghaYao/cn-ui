import { Icon } from "./Icon";

import IconNames from "./IconNames.json";
export const Controller = [
    {
        type: "select",
        default: "refresh",
        prop: "name",
        options: IconNames.map((i) => ({ value: i })),
    },
    {
        type: "switch",
        default: true,
        prop: "spin",
    },
    {
        type: "range",
        default: "50px",
        prop: "size",
        min: 0,
        max: 100,
    },
];
export default Icon;
