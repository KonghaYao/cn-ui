import { atom } from '@cn-ui/use';
import { Breadcrumb, Cascader, Icon, useChinaArea } from '@cn-ui/core';
export const Controller = [];

export default (props) => {
    const value = atom(['北京市', '北京市', '东城区']);
    const { options } = useChinaArea(value);
    return (
        <>
            <Breadcrumb
                class="m-4 "
                list={value}
                separator={<Icon name="arrow_right_alt"></Icon>}
            ></Breadcrumb>
            <Cascader class="m-4 rounded-lg  " options={options} value={value}></Cascader>
        </>
    );
};
