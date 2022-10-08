import { reflect } from '@cn-ui/use';
import { areaList } from '@vant/area-data';
import { Atom } from 'solid-use';

const findCodeByName = (name: string, obj: { [k: string]: string }) => {
    if (!name) return null;
    for (let [key, val] of Object.entries(obj)) {
        if (val === name) return key;
    }
    return null;
};

const countyEntry = Object.entries(areaList.county_list);

/** @zh 搜索中国省市区域 */
export const searchChinaArea = () => {
    /** 因为地区不长，没有必要进行 fuse.js 加载 */
    return (searchText: string) => {
        return countyEntry.filter(([code, name]) => {
            return name.startsWith(searchText);
        });
    };
};

/**
 * @zh 中国地区的数据查询，配合 Cascader 使用
 */
export const useChinaArea = (value: Atom<string[]>) => {
    const provinceList = Object.values(areaList.province_list);
    const options = reflect(() => {
        const [province, city] = value();

        const provinceCode = (findCodeByName(province, areaList.province_list) || '110101').slice(
            0,
            2
        );
        const cityList = Object.entries(areaList.city_list)
            .filter((i) => i[0].startsWith(provinceCode))
            .map((i) => i[1]);

        const cityCode = (findCodeByName(city, areaList.city_list) || provinceCode + '0101').slice(
            0,
            4
        );
        const countyList = countyEntry.filter((i) => i[0].startsWith(cityCode)).map((i) => i[1]);
        // console.log(cityList);
        return [provinceList, cityList, countyList];
    });
    return {
        options,
        getCode(): string | null {
            return findCodeByName(value()[2], areaList.county_list);
        },
        changeToCode(code: string) {
            const province = code.slice(0, 2) + '0000';
            const city = code.slice(0, 4) + '00';
            return [
                areaList.province_list[province],
                areaList.city_list[city],
                areaList.county_list[code],
            ];
        },
    };
};
