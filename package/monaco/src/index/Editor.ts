import { getMonaco } from "./monaco";
// import * as Monaco from "monaco-editor";
import { CodeEditor } from "../types";

export type initPlugin = (editor: CodeEditor, monaco: any) => void;

/** 开始初始化 Monaco 编辑器 */
export const initMonaco = async (
    rootElement: HTMLElement,
    value: string,
    language: string,
    initOptions: Partial<any>,
    plugins: initPlugin[]
) => {
    const monaco = await getMonaco();
    const monacoEditor = monaco.editor.create(rootElement, {
        value,
        language,
        autoIndent: "advanced",
        automaticLayout: true,
        fontFamily: "Consolas",
        fontSize: 16,
        ...initOptions,
    });

    plugins.forEach((i) => i(monacoEditor!, monaco));
    return monacoEditor as CodeEditor;
};
