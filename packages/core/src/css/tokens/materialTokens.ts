import type { TokenLike } from ".";
import { BaseColor } from "./BaseColor";

const Token = {
    WhiteBorder: "1px solid rgba(209, 213, 219, 0.3)",
    BlackBorder: "1px solid rgba(255, 255, 255, 0.125)",
};

/**
 *
 * @link https://www.figma.com/file/HEvUIZSLxAQ0mGbllDDBl7/iOS-17-and-iPadOS-17-(Community)?type=design&node-id=224%3A56304&mode=design&t=Tci3XVGl8oCQgr8I-1
 */
export const materialTokens = (Colors = BaseColor): TokenLike => [
    [
        "bg-design-thick",

        {
            "background-color": "rgba(255, 255, 255, 0.93)",
            "backdrop-filter": "blur(5px) saturate(180%)",
            border: Token.WhiteBorder,
        },
        {
            "background-color": "rgba(17, 25, 40, 0.93)",
            "backdrop-filter": "blur(5px) saturate(180%)",
            border: Token.BlackBorder,
        },
    ],
    [
        "bg-design-regular",

        {
            "background-color": "rgba(255, 255, 255, 0.84)",
            "backdrop-filter": "blur(8px) saturate(180%)",
            border: Token.WhiteBorder,
        },
        {
            "background-color": "rgba(17, 25, 40, 0.84)",
            "backdrop-filter": "blur(8px) saturate(180%)",
            border: Token.BlackBorder,
        },
    ],
    [
        "bg-design-thin",

        {
            "background-color": "rgba(255, 255, 255, 0.56)",
            "backdrop-filter": "blur(14px) saturate(180%)",
            border: Token.WhiteBorder,
        },
        {
            "background-color": "rgba(17, 25, 40, 0.56)",
            "backdrop-filter": "blur(14px) saturate(180%)",
            border: Token.BlackBorder,
        },
    ],
    [
        "bg-design-ultra-thin",

        {
            "background-color": "rgba(255, 255, 255, 0.17)",
            "backdrop-filter": "blur(25px) saturate(180%)",
            border: Token.WhiteBorder,
        },
        {
            "background-color": "rgba(17, 25, 40, 0.17)",
            "backdrop-filter": "blur(8px) saturate(180%)",
            border: Token.BlackBorder,
        },
    ],
];
