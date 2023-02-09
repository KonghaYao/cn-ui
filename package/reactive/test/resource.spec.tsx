import { atom } from '../src/atom';
import { render, renderHook, waitFor } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { ResourceAtom, resource } from '../src/resource';
import { ErrorBoundary } from 'solid-js';

describe('resource 测试', () => {
    const asyncFunc = async (page: number) => {
        return [...Array(10).keys()].map((i) => page * 10 + i);
    };
    it('resource normal', async () => {
        const {
            result: { source, page },
        } = renderHook(() => {
            const page = atom(0);
            const source = resource(async () => {
                const data = await asyncFunc(page());
                page((i) => i + 1);
                return data;
            });

            return { source, page };
        });
        expect(page()).eq(0);
        expect(source.loading()).eq(true);
        // 等待页面进行加载，然后才能够能够获取到状态
        await waitFor(async () => {
            expect(await source.promise()).eq(true);
            expect(source.error()).eq(false);
            expect(source.loading()).eq(false);
            expect(source()).eql(await asyncFunc(0));
            await source.refetch();
            expect(source()).eql(await asyncFunc(1));
        });
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
