import type { Meta, StoryObj } from "storybook-solidjs";

import { NullAtom, StoreToAtom, atom } from "@cn-ui/reactive";
import { For, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { Col, Row } from "../RowAndCol";
import { JSONViewer } from "../dataViewer";
import { registerAllControlComponent } from "../register";
import type { ColumnDef } from "../table/solidTable";
import { FormCore } from "./FormCore";
import { MagicForm } from "./MagicForm";

registerAllControlComponent();

const meta = {
    title: "From/FormCore",
    component: FormCore,
    argTypes: {},
} satisfies Meta<typeof FormCore>;

export default meta;
type Story = StoryObj<typeof meta>;

const mustFill = {
    required: true,
    message: "此项必填",
};
const configs = [
    { header: "info", accessorKey: "info", type: "text", required: true },
    { header: "number", accessorKey: "number", type: "number" },
    { header: "date", accessorKey: "date", type: "date", rules: [mustFill] },
    { header: "date-range", accessorKey: "date-range", type: "date-range" },
    {
        header: "select",
        accessorKey: "select",
        type: "select",
        options: [
            {
                value: "jack",
                label: "Jack",
            },
            {
                value: "lucy",
                label: "Lucy",
            },
            {
                value: "tom",
                label: "Tom",
            },
        ],
        span: 12,
    },
    {
        header: "switch",
        accessorKey: "switch",
        type: "switch",

        span: 12,
    },
    {
        header: "checkbox",
        accessorKey: "checkbox",
        type: "checkbox",
        options: [
            {
                value: "jack",
                label: "Jack",
            },
            {
                value: "lucy",
                label: "Lucy",
            },
            {
                value: "tom",
                label: "Tom",
            },
        ],
        span: 12,
    },
    {
        header: "radio",
        accessorKey: "radio",
        type: "radio",
        options: [
            {
                value: "jack",
                label: "Jack",
            },
            {
                value: "lucy",
                label: "Lucy",
            },
            {
                value: "tom",
                label: "Tom",
            },
        ],
        rules: [mustFill],
        span: 12,
    },
    {
        header: "cascader",
        accessorKey: "cascader",
        type: "cascader",
        options: [
            {
                value: "jack",
                label: "Jack",
            },
            {
                value: "lucy",
                label: "Lucy",
            },
            {
                value: "tom",
                label: "Tom",
            },
        ],
        rules: [mustFill],
        span: 24,
    },
] satisfies ColumnDef<unknown, unknown>[];

export const Primary: Story = {
    name: "FormCore 表单核心",
    render() {
        const [obj, setObj] = createStore({
            switch: true,
            checkbox: ["tom", "lucy"],
            info: "123321",
            date: "2024-06-12T16:00:00.000Z",
            "date-range": ["2024-06-03T16:00:00.000Z", "2024-06-12T16:00:00.000Z"],
            cascader: [{ value: "lucy", label: "Lucy" }],
            number: 0,
            select: "lucy",
            radio: "jack",
        });
        const form = NullAtom<HTMLFormElement>(null);
        const formData = atom({});
        const getFormData = () => {
            if (!form()) formData({});
            formData(Object.fromEntries(new FormData(form()!).entries()));
        };
        const time = setInterval(() => {
            getFormData();
        }, 1000);
        onCleanup(() => clearInterval(time));
        const disabled = atom(false);
        return (
            <form ref={form}>
                <Row>
                    <For each={configs}>
                        {(item) => {
                            const model = StoreToAtom([obj, setObj], (item as any).accessorKey);
                            return (
                                <FormCore
                                    disabled={disabled()}
                                    showLabel
                                    config={item}
                                    v-model={model}
                                />
                            );
                        }}
                    </For>
                    <Col span={24}>
                        <div
                            onclick={() => {
                                disabled((i) => !i);
                            }}
                        >
                            Disable Trigger
                        </div>
                    </Col>
                    <Col span={12}>
                        <JSONViewer data={obj} />
                    </Col>
                    <Col span={12}>
                        <JSONViewer data={formData()} />
                        {JSON.stringify(obj)}
                    </Col>
                </Row>
            </form>
        );
    },
    args: {},
};

export const _MagicForm: Story = {
    name: "MagicForm 集成表单",
    render() {
        const [obj, setObj] = createStore({
            select: "tom",
        });
        return (
            <Row>
                <MagicForm config={configs} originData={obj} setOriginData={setObj} />
                <Col span={24}>
                    <JSONViewer data={obj} />
                </Col>
            </Row>
        );
    },
    args: {},
};
export const _Error: Story = {
    name: "ErrorState 错误状态",
    render() {
        const [obj, setObj] = createStore({});
        return (
            <Row>
                <MagicForm
                    config={configs.map((i) => {
                        i.required = true;
                        return i;
                    })}
                    originData={obj}
                    setOriginData={setObj}
                />
                <Col span={24}>
                    <JSONViewer data={obj} />
                </Col>
            </Row>
        );
    },
    args: {},
};
