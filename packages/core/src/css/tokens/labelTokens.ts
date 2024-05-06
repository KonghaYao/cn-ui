import type { TokenLike } from ".";
import { BaseColor } from "./BaseColor";

export const labelTokens = (Colors = BaseColor): TokenLike => [
    [
        "text-design-primary",

        {
            color: Colors.Black,
        },
        {
            color: Colors.White,
        },
    ],
    [
        "text-design-secondary",

        {
            color: `${Colors.LabelSecondaryBlack}99`,
        },
        {
            color: `${Colors.LabelSecondaryWhite}99`,
        },
    ],
    [
        "text-design-tertiary",

        {
            color: `${Colors.LabelSecondaryBlack}4c`,
        },
        {
            color: `${Colors.LabelSecondaryWhite}4c`,
        },
    ],
    [
        // placeholder 也是这个颜色
        "text-design-quarternary",

        {
            color: `${Colors.LabelSecondaryBlack}2d`,
        },
        {
            color: `${Colors.LabelSecondaryWhite}2d`,
        },
    ],
];
