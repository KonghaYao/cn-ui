/**
 * ! HTML5 中的 DataTransfer 会全局变化
 * ! 所以 dragover 的时候收集不到信息
 */
let holding = {
    info: '',
    getData(type: string) {
        return this.info;
    },
    setData(type: string, data: string) {
        this.info = data;
    },
    types: [],
} as any as DataTransfer;

export const useDragAndDropData = <TransferData extends { type: string; data: any }>() => {
    /**
     *
     * @param eventTransfer 如果为 false，接收全局默认的数据
     */
    const receive = <T>(
        eventTransfer: DataTransfer,
        type: string,
        cb: (data: any, dataTransfer: DataTransfer, originEvent: unknown) => T,
        originEvent: unknown
    ): boolean => {
        type = type.toLowerCase();
        const transfer = eventTransfer || holding;

        for (const iterator of [...transfer.types]) {
            if (iterator === 'x-application/' + type) {
                const data = transfer.getData('x-application/' + type);

                try {
                    const Payload = JSON.parse(data) as TransferData;
                    cb(Payload.data, eventTransfer, originEvent);
                    return true;
                } catch (e) {
                    console.warn(e);
                    return false;
                }
            }
        }

        return false;
    };
    return {
        send(transfer: DataTransfer, info: TransferData) {
            let type = 'x-application/' + info.type.toLowerCase();
            const string = JSON.stringify(info);
            transfer.setData(type, string);
            holding.setData(type, string);
        },
        receiveAll(
            eventTransfer: DataTransfer,
            obj: Record<
                string,
                (data: any, dataTransfer: DataTransfer, originEvent: unknown) => void
            >,
            multi = false,
            originEvent: unknown
        ) {
            Object.entries(obj)[multi ? 'forEach' : 'some'](([key, value]) => {
                if (key === 'extra') {
                    return value(null, eventTransfer, originEvent);
                } else {
                    return receive(eventTransfer, key, value, originEvent);
                }
            });
        },

        receive,
        detect(
            eventTransfer: DataTransfer,
            payload: { [key: string]: (transfer: DataTransfer, originEvent: unknown) => void },
            originEvent: unknown
        ) {
            // type 需要解构保持状态
            for (const transType of [...eventTransfer.types]) {
                if (transType.startsWith('x-application/')) {
                    payload[transType] && payload[transType](eventTransfer, originEvent);
                    const key = transType.replace('x-application/', '').toUpperCase();
                    payload[key] && payload[key](eventTransfer, originEvent);
                }
            }
            payload.extra && payload.extra(eventTransfer, originEvent);
        },
    };
};
