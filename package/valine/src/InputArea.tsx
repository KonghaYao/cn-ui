import { atom } from '@cn-ui/use';
import { For, useContext } from 'solid-js';
import { EmojiList, ValineMarkdown } from './ValineMarkdown';
import { ValineContext } from '.';
import { FloatPanelWithAnimate } from '@cn-ui/core';
import '@cn-ui/animate/src/scale.css';
export const InputArea = () => {
    const { meta } = useContext(ValineContext);
    const headerMessage = {
        nick: atom(''),
        mail: atom(''),
        link: atom(''),
    };
    const mainText = atom('');
    const PreviewMode = atom(false);

    return (
        <div class="flex flex-col p-2">
            <header class="grid grid-cols-3 gap-2">
                <For each={meta}>
                    {(item: string) => {
                        return (
                            <input
                                class="outline-none"
                                type="text"
                                value={headerMessage[item]()}
                                oninput={(e) => headerMessage[item]((e.target as any).value)}
                                placeholder={item}
                            />
                        );
                    }}
                </For>
            </header>

            <textarea
                placeholder="输入你的善意"
                class="w-full max-h-[50vh] min-h-[20vh] bg-gray-300 outline-none"
                value={mainText()}
                oninput={(e) => mainText((e.target as any).value)}
                cols="30"
            ></textarea>

            <footer class="flex gap-2">
                <FloatPanelWithAnimate
                    animateProps={{ anime: 'scale' }}
                    // visible={true}
                    // disabled={true}
                    popup={() => {
                        return (
                            <div class="flex gap-1 w-screen max-w-xs flex-wrap p-2 rounded-sm">
                                <EmojiList
                                    onChoose={(text) => {
                                        mainText((i) => i + `:${text}:`);
                                    }}
                                ></EmojiList>
                            </div>
                        );
                    }}
                >
                    <span class="cursor-pointer scale-125  rounded-md">😄</span>
                </FloatPanelWithAnimate>
                <FloatPanelWithAnimate
                    animateProps={{ anime: 'scale' }}
                    visible={PreviewMode}
                    // disabled={true}

                    popup={() => {
                        return (
                            <div class="w-screen max-w-xs">
                                <header>预览视口</header>
                                <ValineMarkdown code={mainText()}></ValineMarkdown>
                            </div>
                        );
                    }}
                >
                    <span
                        class="cursor-pointer scale-125  rounded-md"
                        onclick={() => PreviewMode((i) => !i)}
                    >
                        📝
                    </span>
                </FloatPanelWithAnimate>
            </footer>
        </div>
    );
};
