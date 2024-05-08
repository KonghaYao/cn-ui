// token 数据类型
import type { CSSObject } from "unocss";
import { BaseColor } from "./BaseColor";
/**
 *  [token_name,light,dark][]
 */
export type TokenLike = [string, CSSObject, CSSObject][];

export class TokenRules {
    constructor(
        public token: TokenLike,
        public colors = BaseColor,
    ) {}
    toUnoCssRules() {
        return this.token.map(([key, light]) => {
            return [
                key,
                Object.fromEntries(
                    Object.entries(light).map(([cssName], index) => {
                        return [cssName, `var(--cn-${key}-${index})`];
                    }),
                ),
            ];
        });
    }
    toCssVars() {
        return this.token
            .flatMap(([key, light, dark]) => {
                return Object.entries(light).map(([cssName, val], index) => {
                    return {
                        light: `--cn-${key}-${index}: ${val};`,
                        dark: `--cn-${key}-${index}: ${(dark as any)[cssName]};`,
                    };
                });
            })
            .reduce(
                (cur, col) => {
                    cur.dark += col.dark;
                    cur.light += col.light;
                    return cur;
                },
                {
                    light: "",
                    dark: "",
                },
            );
    }
}
