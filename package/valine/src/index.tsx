import { atom, resource } from '@cn-ui/use';
import { Markdown } from '@cn-ui/markdown';
import { FloatPanel } from '@cn-ui/core';
import { Component, For, Show, createContext, mergeProps, useContext } from 'solid-js';
import AV from 'leancloud-storage';
import { usePagination } from '@cn-ui/headless';
import { timeAgo } from './timeage';
type ValineConfig = {
    avatar?: string | false;
    avatarForce?: boolean;
    avatar_cdn?: string;
    VERSION?: string;
    meta?: string[];
    url?: string;
    DatabaseName?: string;
    appId: string;
    appKey: string;
    serverURLs: string;
};
export const ValineContext = createContext<Required<ValineConfig>>();
const META = ['nick', 'mail', 'link'];
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
        <div>
            <header>
                <For each={meta}>
                    {(item: string) => {
                        return (
                            <input
                                type="text"
                                value={headerMessage[item]()}
                                oninput={(e) => headerMessage[item]((e.target as any).value)}
                                placeholder={item}
                            />
                        );
                    }}
                </For>
            </header>
            <div>
                <Show
                    when={PreviewMode()}
                    fallback={
                        <textarea
                            value={mainText()}
                            oninput={(e) => mainText((e.target as any).value)}
                            cols="30"
                            rows="10"
                        ></textarea>
                    }
                >
                    <Markdown code={mainText()}></Markdown>
                </Show>
            </div>
            <footer></footer>
        </div>
    );
};

export const useTotalCounter = () => {
    const { DatabaseName, url } = useContext(ValineContext);
    const count = resource(() => {
        return createCommonQuery(DatabaseName, url).count();
    });
    return count;
};

export const createSubQuery = async (DatabaseName: string, idsArr: string[]) => {
    let ids = JSON.stringify(idsArr).replace(/(\[|\])/g, '');
    let cql = `select * from ${DatabaseName} where rid in (${ids}) order by -createdAt,-createdAt`;
    return AV.Query.doCloudQuery(cql).then((res) => (res as any).results);
};
export const createCommonQuery = (DatabaseName: string, url: string) => {
    let notExist = new AV.Query(DatabaseName);
    notExist.doesNotExist('rid');
    let isEmpty = new AV.Query(DatabaseName);
    isEmpty.equalTo('rid', '');
    let q = AV.Query.or(notExist, isEmpty);
    q.equalTo('url', url);
    q.addDescending('createdAt');
    q.addDescending('insertedAt');
    return q;
};

export const List = () => {
    const { DatabaseName, url } = useContext(ValineContext);
    const total = useTotalCounter();
    const rootIds = atom<string[]>([]);
    const subQuery = resource<CommentObject[]>(
        () => {
            return createSubQuery(DatabaseName, rootIds()).then((res) => {
                console.log(res);
                return res;
            });
        },
        [],
        false
    );
    const { currentData, currentPage, maxPage } = usePagination((page, maxPage) => {
        maxPage(() => Math.ceil(total() / 10));

        return createCommonQuery(DatabaseName, url)
            .limit(10)
            .skip(10 * page)
            .find()
            .then((res) => {
                rootIds(res.map((i) => i.id));
                subQuery.refetch();
                return res as CommentObject[];
            });
    });
    return (
        <div>
            <Show when={total.isReady()}>
                <div>{total()}条评论</div>
            </Show>
            <Show when={currentData.isReady()}>
                <For each={currentData()}>
                    {(item) => {
                        return (
                            <CommentItem
                                data={item}
                                subChildren={
                                    subQuery().filter((i) => i.attributes.pid === item.id) ?? []
                                }
                            ></CommentItem>
                        );
                    }}
                </For>
            </Show>
        </div>
    );
};
interface CommentData {
    nick: string;
    ip: string;
    updatedAt: string;
    objectId: string;
    mail: string;
    ua: string;
    insertedAt: {
        __type: 'Date';
        iso: string;
    };
    rid: string;
    pid: string;
    link: string;
    comment: string;
    url: string;
    QQAvatar: string;
}
export type CommentObject = { attributes: CommentData } & AV.Queriable;

export const CommentItem: Component<{ data: CommentObject; subChildren: CommentObject[] }> = (
    props
) => {
    const attr = props.data.attributes;
    const {} = useContext(ValineContext);
    return (
        <div class="border-b ">
            <header>
                <div>{attr.nick ?? '匿名'}</div>
            </header>
            <main>
                <Markdown code={attr.comment}></Markdown>
            </main>
            <footer>
                <div class="text-sm">{timeAgo(new Date(props.data.createdAt))}</div>
            </footer>

            <div class="pl-2">
                <For each={props.subChildren}>
                    {(item) => {
                        return <CommentItem data={item} subChildren={[]}></CommentItem>;
                    }}
                </For>
            </div>
        </div>
    );
};

const useValineAvatar = () => {
    const { avatar, avatarForce, avatar_cdn, VERSION } = useContext(ValineContext);
    const setting = {
        cdn: 'https://gravatar.loli.net/avatar/',
        ds: ['mp', 'identicon', 'monsterid', 'wavatar', 'robohash', 'retro', ''],
        params: '',
        hide: false,
    };
    let force = avatarForce ? '&q=' + Math.random().toString(32).substring(2) : '';

    setting['params'] = `?d=${avatar}&v=${VERSION}${force}`;
    setting['hide'] = avatar === false ? true : false;
    setting['cdn'] = /^https?\:\/\//.test(avatar_cdn) ? avatar_cdn : setting['cdn'];

    return setting;
};

export const ValineDefault: Component<ValineConfig> = (props) => {
    props = mergeProps(props, {
        avatar: 'mp',
        avatarForce: false,
        avatar_cdn: '',
        VERSION: '1.4.0',
        meta: META,
        url: '/',
        DatabaseName: 'Comment',
    } as Required<ValineConfig>);
    AV.init({
        appId: props.appId,
        appKey: props.appKey,
        serverURLs: props.serverURLs,
    });
    return (
        <ValineContext.Provider value={props as Required<ValineConfig>}>
            <div class="flex flex-col">
                <InputArea></InputArea>
                <List></List>
            </div>
        </ValineContext.Provider>
    );
};
