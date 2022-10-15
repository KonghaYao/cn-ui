import { DefaultIcon, Message, Select, Space, Tab } from '@cn-ui/core';
Message.init();
import { Code } from '@cn-ui/highlight/src/index';
import { useViewing } from '../hook/useViewing';
import {
    AllowedCodeStyleNames,
    CodeStyleNames,
    useCodeStyle,
} from '../../src/components/Code/useCodeStyle';
import { atom } from '@cn-ui/use';
import { lowlight } from '@cn-ui/highlight/src/index';
import tsx from 'highlight.js/lib/languages/typescript.js';
import copy from 'copy-to-clipboard';
// 需要使用 tsx 的解析
lowlight.registerLanguage('tsx', tsx);

export const CodePreview = () => {
    const { viewing } = useViewing();
    const themeValue = atom<AllowedCodeStyleNames>('atom-dark');
    const { link } = useCodeStyle(themeValue);
    return (
        <Tab id="Code" class="flex-1 overflow-auto">
            <Space>
                <Select
                    options={atom(CodeStyleNames as any as string[])}
                    value={themeValue}
                ></Select>
                <div>
                    <DefaultIcon
                        name="content_copy"
                        color="green"
                        onClick={() => {
                            copy(viewing().code);
                            Message.success('复制成功');
                        }}
                    ></DefaultIcon>
                </div>
            </Space>
            <div class="overflow-auto p-4">
                <Code lang="tsx">{viewing().code}</Code>
            </div>
            {link}
        </Tab>
    );
};
