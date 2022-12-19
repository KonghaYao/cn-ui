import { atom, reflect } from '@cn-ui/use';
import { Monaco } from '@cn-ui/monaco';
import {} from '@cn-ui/core';
export const Controller = [];

export default (props) => {
    const code = atom('');
    const language = atom('cpp');
    return (
        <div class="h-screen w-screen">
            <Monaco value={code} language={'cpp'} theme={'github-gist'}></Monaco>
        </div>
    );
};
