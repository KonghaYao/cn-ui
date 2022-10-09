import { Atom } from '@cn-ui/use';

export interface ExFile extends File {
    fullPath: string;
    isDirectory?: false;
    sha?: string;
    progress?: Atom<number | Error>;
}
