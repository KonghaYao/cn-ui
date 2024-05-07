import { describe, expect, it } from "vitest";
import { SyncStorage, atom, getDefaultSyncStorageOptions } from "../..";

describe("SyncStorage", () => {
    it("should initialize storage with atom value when no data exists", async () => {
        const atomValue = atom("2333");
        const storageLink = SyncStorage(atomValue, "key1");
        expect(localStorage.getItem("key1")).toEqual('"2333"');

        // 修改数据，同步 storage
        atomValue(() => "123123");
        expect(atomValue()).toEqual("123123");
        expect(localStorage.getItem("key1")).toEqual('"123123"');

        storageLink.stop();
        atomValue(() => "0000");
        expect(atomValue()).toEqual("0000");
        expect(localStorage.getItem("key1")).toEqual('"123123"');

        storageLink.sync();
        expect(localStorage.getItem("key1")).toEqual('"0000"');
    });
    it("storage 优先恢复数据", async () => {
        expect(localStorage.getItem("key1")).toEqual('"0000"');
        const atomValue = atom("2333"); // 将被历史数据复写
        SyncStorage(atomValue, "key1");
        expect(atomValue()).toEqual("0000");
        expect(localStorage.getItem("key1")).toEqual('"0000"');
    });
    it("atom 优先恢复数据", async () => {
        expect(localStorage.getItem("key1")).toEqual('"0000"');
        const atomValue = atom("2333");
        SyncStorage(atomValue, "key1", { ...getDefaultSyncStorageOptions(), storageFirst: false });
        expect(atomValue()).toEqual("2333");
        expect(localStorage.getItem("key1")).toEqual('"2333"');
    });
});
