import { Atom } from '@cn-ui/use';

export interface ExFile extends File {
    fullPath: string;
    isDirectory?: false;
    /** 文件唯一值 */
    sha?: string;
    /** 表示进度的一个动态参数 */
    progress?: Atom<number | Error>;
}
