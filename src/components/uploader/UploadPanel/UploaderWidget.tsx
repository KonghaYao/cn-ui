import { JSX, useContext } from 'solid-js';
import { OriginComponent, Atom } from '@cn-ui/use';
import { Box } from '../../Box/Box';
import { Button } from '../../Button';
import { UploaderContext } from '../base/UploaderContext';

export interface UploaderWidgetProps extends JSX.HTMLAttributes<HTMLDivElement> {}
export const UploadWidget = OriginComponent<UploaderWidgetProps>((props) => {
    const { isDragging, inputRef } = useContext(UploaderContext);
    return (
        <Box
            {...props}
            title={isDragging() ? '放下即可上传' : '拖拽或者点击上传文件'}
            icon={
                <Button color="blue" round onClick={() => inputRef().click()}>
                    上传文件
                </Button>
            }
        ></Box>
    );
});
