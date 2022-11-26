export * from './types';
export type { AllTheme, ThemeName } from './index/initTheme';
export { ThemeStore } from './index/initTheme';
import { initMonaco, initPlugin } from './index/Editor';
import { initTheme, AllTheme, applyTheme } from './index/initTheme';

import { CodeEditor, LanguageList } from './types';
import { Component, createEffect, on, onCleanup, onMount, Suspense } from 'solid-js';
import { Atom, atomization, createIgnoreFirst } from '@cn-ui/use';
export const Monaco: Component<{
    value: Atom<string> | string;
    theme?: Atom<keyof AllTheme> | keyof AllTheme;
    language: Atom<LanguageList> | LanguageList;
    options?: any | Atom<any>;
    onSave?: (val: string) => void;
    onReady?: (monacoEditor: any) => void;
}> = (props) => {
    let value = atomization(props.value);
    let language = atomization(props.language);
    let theme = atomization(props.theme ?? 'github-gist');
    let options = atomization(props.options || {});
    let root: HTMLDivElement;
    let monacoEditor = null as CodeEditor | null;

    onMount(async () => {
        console.group('MonacoEditor 加载开始');
        await initTheme();
        monacoEditor = await initMonaco(root!, value(), language(), props.options, [
            initEvent,
            initKeybind,
            initAction,
        ]);
        // 保证延迟加载成功
        setValue(value());
        await applyTheme(theme());
        console.groupEnd();
        props.onReady && props.onReady(monacoEditor);
    });

    /** 保存代码 */
    const saveValue = () => {
        if (monacoEditor === null) return;
        const code = monacoEditor!.getValue();
        value(code);
        console.log('MonacoEditor 保存成功');
        props.onSave && props.onSave(code);
        return code;
    };

    /** 必须要通过这种方式改变编辑来保证贯标处于正确位置 */
    const setValue = (code: string) => {
        if (monacoEditor === null) return;
        let range = monacoEditor.getModel()!.getFullModelRange();

        let op = {
            identifier: { major: 1, minor: 1 },
            range,
            text: code,
            forceMoveMarkers: true,
        };
        monacoEditor.executeEdits(code, [op]);
        monacoEditor.focus();
    };
    createEffect(() => {
        value();
        if (monacoEditor && value() !== monacoEditor!.getValue()) {
            setValue(value());
        }
    });
    // 自动更新 options
    createEffect(
        on(options, (val) => {
            console.log('更新配置文件');
            if (val && monacoEditor) monacoEditor.updateOptions(val);
        })
    );

    /** 自动更新 theme */
    createEffect(on(theme, applyTheme));
    /** 自动更新 language */
    createEffect(
        on(language, () => {
            if (monacoEditor === null) return;
            /**@ts-ignore */
            window.monaco.editor.setModelLanguage(monacoEditor.getModel()!, language());
            console.log('语言更换为 ' + language());
        })
    );
    /* ====== 初始化操作 ===== */
    /** 添加菜单的操作 */
    const initAction: initPlugin = (editor, monaco) => {
        editor.addAction({
            id: 'save', // 菜单项 id
            label: '保存', // 菜单项名称
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS], // 绑定快捷键，是 monacoEditor 自定义的对应关系
            contextMenuGroupId: 'navigation', // 所属菜单的分组
            run: () => {
                saveValue();
            }, // 点击后执行的操作
        });
    };

    /** 绑定快捷键 */
    const initKeybind: initPlugin = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => saveValue());
    };
    /** 绑定相关的编辑器事件 */
    const initEvent: initPlugin = (editor, monaco) => {
        // console.log(this.monacoEditor);
        editor.onDidChangeModelContent(() => {
            const code = editor!.getValue();
            value(code);
        });
    };

    onCleanup(() => {
        monacoEditor && monacoEditor.dispose();
        monacoEditor = null;
    });

    return <div class="h-full w-full" ref={root}></div>;
};
