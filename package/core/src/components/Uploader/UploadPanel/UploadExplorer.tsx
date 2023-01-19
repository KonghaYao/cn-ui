import { JSX, useContext } from 'solid-js';
import { OriginComponent } from '@cn-ui/use';
import { UploaderContext } from '../base/UploaderContext';
import { Explorer } from '../../Explorer';
import { DefaultIcon } from '../../Icon';

export interface UploaderExplorerProps extends JSX.HTMLAttributes<HTMLDivElement> {}
export const UploadExplorer = OriginComponent<UploaderExplorerProps>((props) => {
    const { Files } = useContext(UploaderContext);
    return (
        <Explorer
            {...props}
            Files={Files}
            onOpenFile={(file) => {
                console.log(file);
            }}
            FileExtra={(file) => (
                <DefaultIcon
                    name="file_upload"
                    color="blue"
                    onClick={() => {
                        // TODO 上传未完成
                        console.log(file);
                    }}
                ></DefaultIcon>
            )}
            FolderExtra={(folder) => (
                <DefaultIcon
                    name="drive_folder_upload"
                    color="blue"
                    onClick={() => {
                        console.log(folder);
                    }}
                ></DefaultIcon>
            )}
        ></Explorer>
    );
});
