import { Image, Icon, Badge, Mask, Position } from '@cn-ui/core';
export const Controller = [];
export default (props) => {
    const avatar = () => (
        <Image
            src="https://foruda.gitee.com/avatar/1663940152493388167/5342313_dongzhongzhidong_1663940152.png"
            // 使用 block 布局修复 inline 的 多余高度问题
            block
            height={60}
            width={60}
            round
        ></Image>
    );
    return (
        <>
            <Mask {...props} class="w-fit">
                {avatar()}
                <Position right="0" bottom="0">
                    <div
                        class="bg-slate-900 text-white"
                        style={{
                            'border-radius': '4px',
                        }}
                    >
                        <Icon name="camera"></Icon>
                    </div>
                </Position>
            </Mask>
            <Mask {...props} class="w-fit">
                {avatar()}
                <Position full right="0" bottom="0">
                    <div
                        style={{
                            background: '#00000099',
                            height: '100%',
                            color: 'white',
                            display: 'flex',
                            'justify-content': 'center',
                            'align-items': 'center',
                        }}
                    >
                        <Icon name="camera" size={36}></Icon>
                    </div>
                </Position>
            </Mask>
            <Mask {...props} class="w-fit">
                {avatar()}
                <Position right="0" bottom="0">
                    <Badge count="100"></Badge>
                </Position>
            </Mask>
            <Mask {...props} class="w-fit">
                {avatar()}
                <Position right="0" bottom="0">
                    <Badge
                        count="1"
                        onclick={() => {
                            console.log('点击成功');
                        }}
                    ></Badge>
                </Position>
            </Mask>
            <Mask {...props} class="w-fit">
                {avatar()}
                <Position top="0.2em" right="0.2em">
                    <Badge dot></Badge>
                </Position>
            </Mask>
        </>
    );
};
