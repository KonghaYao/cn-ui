import { createAC } from '@cn-ui/headless';
import { genArray, resource } from '@cn-ui/use';
import { Skeleton, Button, SkeletonAvatar } from '@cn-ui/core';
import { SkeletonParagraph, SkeletonImage } from '@cn-ui/core';
const AC = createAC({
    loading(data) {
        return (
            <Skeleton>
                <div class="flex w-full gap-2 ">
                    <SkeletonAvatar></SkeletonAvatar>
                    <nav class="flex flex-1 flex-col gap-4">
                        {genArray(4).map((i) => {
                            return <SkeletonParagraph></SkeletonParagraph>;
                        })}
                    </nav>
                </div>
            </Skeleton>
        );
    },
});

export default () => {
    let Res: Function;
    const longTerm = resource(() => new Promise((res, rej) => (Res = res)));
    return (
        <>
            <AC resource={longTerm}>
                <Skeleton>
                    <SkeletonImage class="aspect-video"></SkeletonImage>
                </Skeleton>
            </AC>
            <Button
                onClick={() => {
                    longTerm.isReady() ? longTerm.refetch() : Res();
                }}
            >
                切换模式
            </Button>
        </>
    );
};
