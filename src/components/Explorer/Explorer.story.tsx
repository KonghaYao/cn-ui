export const Controller = [];

import { atom, reflect } from '@cn-ui/use';
import { createResource } from 'solid-js';

import { InputText, DefaultIcon, Message, Space, Explorer } from '@cn-ui/core';

export default () => {
    const packageNames = atom<string>('jquery@3.2.1');
    const [resource, { refetch }] = createResource(async () => {
        return fetch('https://data.jsdelivr.com/v1/package/npm/' + packageNames()).then((i) =>
            i.json()
        );
    });
    const loop = (item, name, collection) => {
        item.forEach((i) => {
            if (i['type'] === 'directory') {
                return loop(i.files, name + '/' + i.name, collection);
            } else {
                collection.push({ ...i, fullPath: name + '/' + i.name });
            }
        });
        return;
    };
    const data = reflect(() => {
        if (resource()) {
            const collection = [];
            loop(resource().files, '', collection);
            return collection;
        } else {
            return [];
        }
    });
    return (
        <>
            <h3>NPM 包文件展示 包名@版本号</h3>
            <Space>
                <InputText value={packageNames}></InputText>
                <DefaultIcon name="check" color="red" onClick={() => refetch()}></DefaultIcon>
            </Space>
            <Explorer
                Files={data}
                onOpenFile={(file) => {
                    Message.info(file.fullPath);
                }}
            ></Explorer>
        </>
    );
};
