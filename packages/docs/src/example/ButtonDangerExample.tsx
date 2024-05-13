import { Button, Message, Popover } from "@cn-ui/core";
import { atom } from "@cn-ui/reactive";

export default () => {
    const randomId = "r-32728290";
    const show = atom(true);
    return (
        <div>
            <div class="mb-18 flex gap-4">
                <Button id={randomId} danger type="primary" onclick={() => show(true)}>
                    Primary
                </Button>
                <Popover
                    popoverTarget={"#" + randomId}
                    v-model={show}
                    trigger="none"
                    content={(context) => {
                        const { model } = context!;
                        return (
                            <div class="flex flex-col">
                                <div class="flex justify-end gap-4">
                                    <Button onclick={() => model(false)}>取消</Button>
                                    <Button
                                        danger
                                        type="primary"
                                        onclick={() => {
                                            model(false);
                                            Message.success("删除操作成功");
                                        }}
                                    >
                                        确认
                                    </Button>
                                </div>
                            </div>
                        );
                    }}
                ></Popover>
                <Button danger>Default</Button>
                <Button danger type="dashed">
                    Dash
                </Button>
                <Button danger type="text">
                    Text
                </Button>
                <Button danger type="link">
                    Link
                </Button>
            </div>
            <div class="mb-14 flex gap-4">
                <Button danger disabled type="primary">
                    Primary
                </Button>
                <Button danger disabled>
                    Default
                </Button>
                <Button danger disabled type="dashed">
                    Dash
                </Button>
                <Button danger disabled type="text">
                    Text
                </Button>
                <Button danger disabled type="link">
                    Link
                </Button>
            </div>
        </div>
    );
};
