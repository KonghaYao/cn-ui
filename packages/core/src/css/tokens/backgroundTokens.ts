import type { TokenLike } from ".";
import { BaseColor } from "./BaseColor";

export const backgroundTokens = (Colors = BaseColor): TokenLike => [
    [
        "bg-design-primary",
        {
            "background-color": Colors.White,
        },
        {
            "background-color": Colors.Black,
        },
    ],
    [
        "bg-design-primary-elevated",
        {
            "background-color": Colors.White,
        },
        {
            "background-color": Colors.SecondaryBlack,
        },
    ],
    [
        "bg-design-secondary",
        {
            "background-color": Colors.SecondaryWhite,
        },
        {
            "background-color": Colors.SecondaryBlack,
        },
    ],
    [
        "bg-design-secondary-elevated",
        {
            "background-color": Colors.SecondaryWhite,
        },
        {
            "background-color": Colors.TertiaryBlack,
        },
    ],
    [
        "bg-design-tertiary",
        {
            "background-color": Colors.White,
        },
        {
            "background-color": Colors.TertiaryBlack,
        },
    ],
    [
        "bg-design-tertiary-elevated",
        {
            "background-color": Colors.White,
        },
        {
            "background-color": Colors.TertiaryWhite,
        },
    ],
    [
        // 浮动按钮所使用的颜色
        "bg-design-floating",
        {
            "background-color": Colors.FloatingWhite,
        },
        {
            "background-color": Colors.SecondaryBlack,
        },
    ],
    [
        // 浮动按钮所使用的颜色
        "bg-design-thick",
        {
            "background-color": Colors.White,
            "backdrop-filter": "saturate(180%) blur(50px);",
        },
        {
            "background-color": Colors.SecondaryBlack,
            "backdrop-filter": "saturate(180%) blur(50px);",
        },
    ],
];
