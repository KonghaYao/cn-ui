/**
 * TODO 尚未测试
 * @zh Blackboard 是用于大型软件中的 api 互通系统，用于解决 Context 不能兄弟互通数据的问题。可以全局注册，也可局部注册
 *
 */
export const createBlackBoard = <T extends Record<string, any>>() => {
    const store = new Map();
    return {
        register<D extends keyof T>(name: D, api: T[D]) {
            if (store.has(name)) {
                throw new Error('Blackboard has a same app named ' + name.toString());
            }
            return store.set(name, api);
        },
        getApp<D extends keyof T>(name: D): T[D] {
            if (!store.has(name))
                throw new Error(`Blackboard app ${name.toString()} isn't init yet`);
            return store.get(name);
        },
        delete(name: keyof T) {
            if (!store.has(name))
                throw new Error(`Blackboard app ${name.toString()} isn't init yet`);
            store.delete(name);
        },
        check(name: keyof T) {
            return store.has(name);
        },
        destroy() {
            store.clear();
        },
    };
};
