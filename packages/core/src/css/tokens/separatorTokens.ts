import type { TokenLike } from ".";
import { BaseColor } from "./BaseColor";

export const separatorTokens = (Colors = BaseColor): TokenLike => [
    [
        "border-design-separator-opacity",
        {
            "border-color": `${Colors.LabelSecondaryBlack}24`,
        },
        {
            "border-color": `${Colors.LabelSecondaryBlack}24`,
        },
    ],
    [
        "border-design-separator",
        {
            "border-color": Colors.SeparatorOpaque,
        },
        {
            "border-color": Colors.SeparatorOpaque,
        },
    ],
];
