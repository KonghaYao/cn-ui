import { createMemo } from 'solid-js';

const allowedTypes = ['string', 'boolean', 'number'];

export const PropsToAttr = (props: any, omit: string[] = []) => {
    return createMemo(() =>
        Object.fromEntries(
            Object.entries(props).filter(
                (i) => !omit.includes(i[0]) && allowedTypes.includes(typeof i[1])
            )
        )
    )();
};
