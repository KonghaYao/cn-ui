import { atom, reflect } from '@cn-ui/use';
import { createResource, onMount } from 'solid-js';
import { Select } from '../Form';
import { Code } from '@cn-ui/highlight/src/index';
import { AllowedCodeStyleNames, useCodeStyle, CodeStyleNames } from './useCodeStyle';
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
                    options={atom(CodeStyleNames as any as string[])}
                    value={themeValue}
                ></Select>
            </div>
            <div class="">
                {code.loading ? (
                    '加载中'
                ) : (
                    <Code lang="ts" class="max-h-[50vh] overflow-auto rounded-lg shadow-xl">
                        {code()}
                    </Code>
                )}
            </div>
            {link}
        </div>
    );
};
