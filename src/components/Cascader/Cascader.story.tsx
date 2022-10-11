import { atom } from '@cn-ui/use';
import { Cascader, useChinaArea } from '@cn-ui/core';
export const Controller = [];

export default (props) => {
    const value = atom(['北京市', '北京市', '东城区']);
    const { options } = useChinaArea(value);
    return (
        <>
            <Cascader options={options} value={value}></Cascader>
            {value().join(' ')}
        </>
    );
};
