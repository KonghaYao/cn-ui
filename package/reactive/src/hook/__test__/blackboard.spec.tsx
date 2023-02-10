import { render, renderHook } from '@solidjs/testing-library';
import { test } from 'vitest';
import { createBlackBoard } from '../blackboard';
import { ObjectAtom } from '../../atom/ObjectAtom';
import { onMount } from 'solid-js';

test('blackboard', () => {
    const useHook1 = () => {
        return ObjectAtom({
            username: 87654321,
            password: 12345678,
        });
    };
    const useHook2 = () => {
        return ObjectAtom({
            info: 'error',
        });
    };
    // 不需要环境依赖
    const bd = createBlackBoard<{
        api1: ReturnType<typeof useHook1>;
        api2: ReturnType<typeof useHook2>;
    }>();
    render(() => {
        return (
            <div>
                {(() => {
                    const api1 = useHook1();
                    bd.register('api1', api1);
                    // 在 Mount 之后可以获取到相应的数据
                    onMount(() => expect(bd.getApp('api2').info()).eq('error'));
                    return <div></div>;
                })()}
                {(() => {
                    const api2 = useHook2();
                    bd.register('api2', api2);
                    // 在 Mount 之后可以获取到相应的数据
                    onMount(() => expect(bd.getApp('api1').username()).eq(87654321));
                    return <div></div>;
                })()}
            </div>
        );
    });

    bd.delete('api1');
    expect(bd.check('api1')).eq(false);

    bd.destroy();
    expect(bd.check('api2')).eq(false);
});
