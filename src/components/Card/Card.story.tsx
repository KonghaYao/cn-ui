import { Card } from '@cn-ui/core';
export const Controller = [];
import './Story.less';
export default (props) => {
    return (
        <Card
            className="demo-card"
            background={
                <img
                    class="background"
                    src="https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                />
            }
        >
            <div class="flex flex-col h-full w-full p-4">
                <header>中文</header>
                <div class="flex-1" style={{ 'min-height': '2em' }}></div>

                <footer>中文分解机覅</footer>
                <nav>极致的描述信息</nav>
            </div>
        </Card>
    );
};
