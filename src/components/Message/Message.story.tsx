import { Avatar } from '../Avatar/index';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Message } from './index';
export const Controller = [];
export default (props) => {
    const Content = ['info', 'success', 'warning', 'error', 'normal', 'loading'].map((i) => {
        return (
            <Button
                onClick={() => {
                    const close = Message[i]({
                        id: Math.random().toString(),
                        content: '这是一条信息',
                        closable: true,
                    });
                }}
            >
                {i}
            </Button>
        );
    });
    return <>{Content}</>;
};
