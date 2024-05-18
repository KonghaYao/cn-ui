import type { TokenLike } from ".";
import { BaseColor } from "./BaseColor";

export const separatorTokens = (Colors = BaseColor): TokenLike => [
    // [
    //     "border-design-separator",
    //     {
    //         "border-color": `${Colors.LabelSecondaryBlack}5b`,
    //     },
    //     {
    //         "border-color": `${Colors.LabelSecondaryBlack}5b`,
    //     },
    // ],
    [
        "border-design-separator",
        {
            "border-color": Colors.SeparatorOpaque,
        },
        {
            "border-color": Colors.SeparatorOpaqueBlack,
        },
    ],
];
