import { For } from 'solid-js';
import Index from './story.index.json';
import { useSearchParams } from '@solidjs/router';
import { Button } from '@cn-ui/core';
import { Space } from '@cn-ui/core';
import { InputText } from '@cn-ui/core';
import { atom, reflect } from '@cn-ui/use';

export const NavBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchText = atom('');
    const filteredIndex = reflect(() => {
        if (searchText() === '') return Index;
        const reg = new RegExp(searchText());
        return Index.filter((i) => reg.test(i.path));
    });
    return (
        <div class="flex flex-col border-r border-solid border-gray-200 p-1">
            <InputText value={searchText} icon={null}></InputText>
            <Space vertical class="TextFont scroll-box-none overflow-auto py-4 px-2">
                <For each={filteredIndex()}>
                    {(i) => {
                        return (
                            <Button
                                class="w-full transition-colors"
                                color={searchParams.path === i.path ? 'blue' : 'white'}
                                onClick={() => {
                                    setSearchParams({ path: i.path }, { resolve: false });
                                }}
                            >
                                {i.path.replace(/.*\/(.*?).story.tsx$/, '$1')}
                            </Button>
                        );
                    }}
                </For>
            </Space>
        </div>
    );
};
