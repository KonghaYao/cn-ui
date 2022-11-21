import { AsyncComponent, AsyncOutlet, Button, InputNumber, Space } from '@cn-ui/core';
import { Anime } from '@cn-ui/transition';
import { sleep } from '../../mocks/sleep';
export const Controller = [];
import 'animate.css';
export default () => {
    return (
        <>
            <AsyncComponent
                /** you will see Buttons after 1s  */
                load={() => sleep(1000, import('../Button/Button.story'))}
            >
                <Anime in="fadeInDown" out="fadeOutUp" appear>
                    {/* use Outlet to show the inner component */}
                    <AsyncOutlet></AsyncOutlet>
                </Anime>
            </AsyncComponent>
        </>
    );
};
