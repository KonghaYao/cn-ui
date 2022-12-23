import { atom } from '@cn-ui/use';
import { createResource } from 'solid-js';
import { Select } from '@cn-ui/core';
import { AllowedCodeStyleNames, useCodeStyle, CodeStyleNames, Code } from '@cn-ui/highlight';
export const Controller = [];
export default (props) => {
    const [code] = createResource(() => {
        return fetch('https://cdn.jsdelivr.net/npm/@cn-ui/use@1.5.0/src/atom.ts').then((res) =>
            res.text()
        );
    });
    const themeValue = atom<AllowedCodeStyleNames>('github-dark');
    const { link } = useCodeStyle(themeValue);
    return (
        <div class="p-4">
            <div class="rounded-md bg-white p-4 ">
                动态样式
                <Select
                    options={CodeStyleNames as any as string[]}
                    value={themeValue.reflux({ value: themeValue() }, (i) => i.value)}
                ></Select>
            </div>
            <div class="">
                {code.loading ? (
                    '加载中'
                ) : (
                    <Code
                        lang="ts"
                        class="max-h-[50vh] overflow-auto rounded-lg p-2 shadow-xl"
                        code={code()}
                    ></Code>
                )}
            </div>
            {link}
        </div>
    );
};