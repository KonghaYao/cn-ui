import sizeData from "analyze/size_report.json";
import prettyBytes from "pretty-bytes";
import { AiOutlineGithub } from "solid-icons/ai";
import { Show } from "solid-js";
import type { JSX } from "solid-js";
import { ImageStore } from "../../ImageStore";
interface CompHeaderProps {
    sourceLink?: string;
    title: string;
    description: string;
    compName?: string;
    image?: keyof typeof ImageStore;
}

export const CompHeader = (props: CompHeaderProps) => {
    const CompSize = sizeData.find((i) => i.name === props.compName);
    return (
        <section class="flex items-center p-8 bg-gray-100 ">
            <section class=" flex-1">
                <h1>{props.title}</h1>
                <p class="text-gray-500">{props.description}</p>
                <div class="flex gap-2 flex-col cursor-default">
                    <Show when={props.sourceLink}>
                        <div class="flex">
                            <div class="text-gray-500 pr-2">源代码》</div>
                            <a
                                class="flex items-center gap-4 px-6"
                                target="_blank"
                                href={`https://github.com/KonghaYao/cn-ui/tree/story${props.sourceLink}`}
                                rel="noreferrer"
                            >
                                <AiOutlineGithub />
                                <span>{props.sourceLink}</span>
                            </a>
                        </div>
                    </Show>
                    <Show when={CompSize}>
                        <div class="flex">
                            <span class="text-gray-500 pr-2">引入方法</span>
                            <ImportTemplate compName={props.compName!} />
                        </div>{" "}
                        <div class="rounded-md flex w-fit gap-2">
                            <div class="text-gray-500 pr-2">引入大小</div>
                            <SplitText left="Origin" right={prettyBytes(CompSize!.size)} />
                            <SplitText left="Gzip" right={prettyBytes(CompSize!.gzip)} />
                            <SplitText left="Br" right={prettyBytes(CompSize!.br)} />
                        </div>
                    </Show>
                </div>
            </section>
            <div class="">
                <Show when={props.image && ImageStore[props.image]}>
                    <a
                        href={ImageStore[props.image!].link}
                        class=" rounded-lg shadow-lg h-84 w-128 aspect-video overflow-hidden block hover:scale-125 transition-transform"
                    >
                        <UnsplashImage
                            class="w-full object-cover "
                            src={ImageStore[props.image!].url}
                            alt={`${props.title} 背景图`}
                        />
                    </a>
                </Show>
            </div>
        </section>
    );
};

export const UnsplashImage = (props: JSX.ImgHTMLAttributes<HTMLImageElement>) => {
    console.log(props.src);
    const newURL = new URL(props.src!);
    newURL.host = "761109889.r.cdn36.com";
    // biome-ignore lint/a11y/useAltText: <explanation>
    return <img {...props} src={newURL.toString()} />;
};
export const ImportTemplate = (props: { compName: string }) => {
    return (
        <pre
            class="astro-code astro-code-themes vitesse-light vitesse-dark w-fit"
            style="margin-bottom:0;--shiki-dark-bg:#121212;color:#393a34;--shiki-dark:#dbd7caee;overflow-x:auto;white-space:pre-wrap;word-wrap:break-word"
            tabindex="0"
        >
            <code>
                <span class="line">
                    <span style="color:#1E754F;--shiki-dark:#4D9375">import</span>
                    <span style="color:#999999;--shiki-dark:#666666"> {"{"}</span>
                    <span style="color:#B07D48;--shiki-dark:#BD976A"> {props.compName}</span>
                    <span style="color:#999999;--shiki-dark:#666666"> {"}"}</span>
                    <span style="color:#1E754F;--shiki-dark:#4D9375"> from</span>
                    <span style="color:#B5695999;--shiki-dark:#C98A7D99"> '</span>
                    <span style="color:#B56959;--shiki-dark:#C98A7D">@cn-ui/core</span>
                    <span style="color:#B5695999;--shiki-dark:#C98A7D99">'</span>
                </span>
                <span class="line"></span>
            </code>
        </pre>
    );
};

export const SplitText = (props: { left: string; right: string }) => {
    return (
        <div class="flex text-white rounded-lg overflow-hidden text-sm items-center">
            <div class="px-1 bg-black">{props.left}</div>
            <div class="px-1 bg-green-600">{props.right}</div>
        </div>
    );
};
