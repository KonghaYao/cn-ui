import { For } from 'solid-js';
import Index from '../src/story.index.json';
import { useSearchParams } from '@solidjs/router';
import { Button } from '../src/components/Button';
import { Space } from '../src/components/Space';
import { InputText } from '../src/components/Form';
import { atom, reflect } from '@cn-ui/use';

export const NavBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchText = atom('');
    const filteredIndex = reflect(() => {
        if (searchText() === '') return Index;
        const reg = new RegExp(searchText());
        return Index.filter((i) => reg.test(i));
    });
    return (
        <div class="flex flex-col border-r border-solid border-gray-200 p-1">
            <InputText value={searchText} icon={null}></InputText>
            <Space vertical class="TextFont overflow-auto py-4 px-2 scroll-box-none">
                <For each={filteredIndex()}>
                    {(i) => {
                        return (
                            <Button
                                class="w-full transition-colors"
                                type={searchParams.path === i ? 'primary' : 'text'}
                                onClick={() => {
                                    setSearchParams({ path: i });
                                }}
                            >
                                {i.replace(/.*\/(.*?).story.tsx$/, '$1')}
                            </Button>
                        );
                    }}
                </For>
            </Space>
        </div>
    );
};
