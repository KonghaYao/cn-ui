import type { AccessorFnColumnDef, AccessorKeyColumnDef } from "../table/solidTable";
export type RootColumnDef<T, D> = AccessorFnColumnDef<T, D> | AccessorKeyColumnDef<T, D>;

export const getKeyFromRootColumnDef = <T, D>(
    column: RootColumnDef<T, D>,
    row: T,
    index: number,
) => {
    if ("accessorKey" in column) {
        return column.accessorKey as string;
    }
    return column.accessorFn(row, index) as string;
};
