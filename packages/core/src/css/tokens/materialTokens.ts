import type { TokenLike } from ".";
import { BaseColor } from "./BaseColor";

/**
 *
 * @link https://www.figma.com/file/HEvUIZSLxAQ0mGbllDDBl7/iOS-17-and-iPadOS-17-(Community)?type=design&node-id=224%3A56304&mode=design&t=Tci3XVGl8oCQgr8I-1
 */
export const materialTokens = (Colors = BaseColor): TokenLike => [
    [
        "bg-design-thick",

        {
            "background-color": Colors.ThickWhite + "DE",
            "backdrop-filter": "blur(4px)",
        },
        {
            "background-color": Colors.ThickBlack + "DE",
            "backdrop-filter": "blur(4px)",
        },
    ],
    [
        "bg-design-regular",

        {
            "background-color": Colors.ThickWhite + "c4",
            "backdrop-filter": "blur(7px)",
        },
        {
            "background-color": Colors.ThickBlack + "c4",
            "backdrop-filter": "blur(7px)",
        },
    ],
    [
        "bg-design-thin",

        {
            "background-color": Colors.ThickWhite + "91",
            "backdrop-filter": "blur(3px)",
        },
        {
            "background-color": Colors.ThickBlack + "91",
            "backdrop-filter": "blur(3px)",
        },
    ],
    [
        "bg-design-ultra-thin",

        {
            "background-color": Colors.ThickWhite + "45",
            "backdrop-filter": "blur(3px)",
        },
        {
            "background-color": Colors.ThickBlack + "45",
            "backdrop-filter": "blur(3px)",
        },
    ],
];
