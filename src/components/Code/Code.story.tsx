import { atom, reflect } from '@cn-ui/use';
import { createResource, onMount } from 'solid-js';
import { Select } from '../Form';
import { Code } from '@cn-ui/highlight';
import { AllowedCodeStyleNames, useCodeStyle, CodeStyleNames } from './useCodeStyle';

export const Controller = [];
export default (props) => {
    const [code] = createResource(() => {
        return fetch('https://cdn.jsdelivr.net/npm/@cn-ui/use@1.5.0/src/atom.ts').then((res) =>
            res.text()
        );
    });
    const themeValue = atom<AllowedCodeStyleNames>('atom-dark');
    const { link } = useCodeStyle(themeValue);
    return (
        <div>
            动态样式{' '}
            <Select options={atom(CodeStyleNames as any as string[])} value={themeValue}></Select>
            {link}
            {code.loading ? '加载中' : <Code lang="ts">{code()}</Code>}
        </div>
    );
};
