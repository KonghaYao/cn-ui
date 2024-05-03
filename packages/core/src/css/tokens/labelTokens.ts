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
            color: `${Colors.LabelSecondaryBlack}3C`,
        },
        {
            color: `${Colors.LabelSecondaryWhite}3C`,
        },
    ],
    [
        "text-design-tertiary",

        {
            color: `${Colors.LabelSecondaryBlack}1E`,
        },
        {
            color: `${Colors.LabelSecondaryWhite}1E`,
        },
    ],
    [
        // placeholder 也是这个颜色
        "text-design-quarternary",

        {
            color: `${Colors.LabelSecondaryBlack}12`,
        },
        {
            color: `${Colors.LabelSecondaryWhite}12`,
        },
    ],
];
