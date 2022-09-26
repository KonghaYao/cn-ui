import { Avatar } from '../Avatar/index';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Message } from './index';
export const Controller = [];
export default (props) => {
    return (
        <>
            <Button
                onClick={() => {
                    Message.success({
                        id: Math.random().toString(),
                        content: '这是一条信息',
                        duration: 20000,
                    });
                }}
            >
                点我发送
            </Button>
        </>
    );
};
