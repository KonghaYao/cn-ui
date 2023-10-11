import { render, renderHook, waitFor } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { ResourceAtom, resource, atom } from '../index';
import { ErrorBoundary } from 'solid-js';
import { sleep } from '../../utils';

describe('resource 测试', () => {
    const asyncFunc = async (page: number) => {
        await sleep(1);
        return [...Array(10).keys()].map((i) => page * 10 + i);
    };
    it('resource normal', async () => {
        const overAsyncTest = vi.fn();
        const tapTest = vi.fn();
        const {
            result: { source, page },
        } = renderHook(() => {
            const page = atom(0);
            const source = resource(async () => asyncFunc(page()), {
                tap(data) {
                    tapTest();
                    page((i) => i + 1);
                },
                refetch: {
                    cancelCallback: overAsyncTest,
                },
            });

            return { source, page };
        });

        expect(page()).eq(0);
        expect(source()).eql(null);
        expect(source.loading()).eq(true);

        // 等待页面进行加载，然后才能够能够获取到状态
        await waitFor(() => {});

        // 这个时候还没完全加载完毕
        expect(await source.promise()).eq(true);

        expect(page()).eq(1);
        expect(source.error()).eq(false);
        expect(source.loading()).eq(false);
        expect(source.isReady()).eq(true);

        expect(source()).eql(await asyncFunc(0));

        await source.refetch();
        await source.promise();
        expect(source()).eql(await asyncFunc(1));
        expect(overAsyncTest).toBeCalledTimes(0);
        expect(tapTest).toBeCalledTimes(2);
    });
    it('resource Error', async () => {
        let err = new Error('info');
        const {
            result: { source, page },
        } = renderHook(() => {
            const page = atom(0);
            const source = resource(async () => {
                const data = await asyncFunc(page());
                page((i) => i + 1);

                throw err;
                // return data;
            });

            return { source, page };
        });
        expect(page()).eq(0);
        expect(source.loading()).eq(true);
        // 等待页面进行加载，然后才能够能够获取到状态
        await waitFor(async () => {
            expect(source.isReady()).eq(false);
            expect(source.loading()).eq(false);
            expect(source.error()).eq(err);
        });
    });
    it('resource deps', async () => {
        const overAsyncTest = vi.fn();
        const {
            result: { source, page },
        } = renderHook(() => {
            const page = atom(0);
            const source = resource(() => asyncFunc(page()), {
                deps: [page],
                refetch: { warn: false, cancelCallback: overAsyncTest },
            });
            return { source, page };
        });
        expect(page()).eq(0);
        expect(source.loading()).eq(true);

        // 等待页面进行加载，然后才能够能够获取到状态
        await waitFor(async () => {
            await source.promise();
            // 依旧是 第一次请求的数据
            expect(source()).eql(await asyncFunc(0));

            // 开始进行依赖更新
            page(10);
            expect(await source.promise()).eq(true);
            expect(source.error()).eq(false);
            expect(source.loading()).eq(false);
            expect(source()).eql(await asyncFunc(10));
            expect(overAsyncTest).toBeCalledTimes(0);
        });
    });
    it('resource Spec', async () => {
        let Source = null as any as ResourceAtom<number[]>;
        const dom = render(() => {
            const source = resource(async () => {
                return asyncFunc(0);
            });
            const page = () => 1;
            Source = source;
            return (
                <ErrorBoundary fallback={'2222'}>
                    <>
                        {!source.loading() && <div>{page()}</div>}
                        {/*  @ts-ignore */}
                        {!source.loading() && <div>{source.aaa.eee}</div>}
                        <div>null</div>
                    </>
                </ErrorBoundary>
            );
        });
        await Source.promise();
        await waitFor(() => {
            expect(Source.error()).eql(false);
            expect(Source.loading()).eql(false);
            expect(dom.asFragment()).eql('2222');
        });
    });
});
