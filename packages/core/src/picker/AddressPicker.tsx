import { For } from 'solid-js'
import { Flex } from '../container'
import { PickerColumn } from './PickerColumn'
import compressedData from '@cn-ui/area-data/dist/area.json'
import { decompress } from '@cn-ui/area-data'
import { memoize } from 'lodash-es'
import { OriginComponent, computed } from '@cn-ui/reactive'
import { SelectItemsType } from '../control/select/Select'

export const getChinaAddressOptions = memoize(() => {
    return [decompress(compressedData.province_list), decompress(compressedData.city_list), decompress(compressedData.county_list)].map((i) => {
        return Object.entries(i).map(([key, value]) => {
            return {
                label: value,
                value: key
            }
        })
    })
})

export interface AddressPickerProps {}

export const AddressPicker = OriginComponent<AddressPickerProps, HTMLDivElement, SelectItemsType[]>((props) => {
    const options = getChinaAddressOptions()
    const data = props.model

    const rebuildOptions = () => {
        const provinceCode = data()[0].value.toString().slice(0, 2)
        const cityUnderProvince = options[1].filter((i) => i.value.startsWith(provinceCode))
        if (!data()[1].value.toString().startsWith(provinceCode)) {
            data((i) => {
                const newArr = [...i]
                newArr[1] = cityUnderProvince[0]
                return newArr
            })
        }

        const cityCode = data()[1].value.toString().slice(0, 4)
        const countyUnderCity = options[2].filter((i) => i.value.startsWith(cityCode))
        if (!data()[2].value.toString().startsWith(cityCode)) {
            data((i) => {
                const newArr = [...i]
                newArr[2] = countyUnderCity[0]
                return newArr
            })
        }

        return [options[0], cityUnderProvince, countyUnderCity]
    }
    const initModel = () => {
        console.log(props.model())
        if (!props.model()?.length) {
            props.model(options.map((i) => i[0]))
        }
        rebuildOptions()
    }
    initModel()
    /**
     * 级联地址的联动选项
     * @effect 强制检查数据正确性并赋值
     */
    const computedOptions = computed(rebuildOptions)

    return (
        <Flex class="w-full">
            <For each={computedOptions()}>
                {(options, index) => {
                    const model = props.model.reflux(props.model()[index()], (i) => {
                        const newArr = [...props.model()]
                        newArr[index()] = i
                        return newArr
                    })
                    return <PickerColumn visibleOptionNum={3} class="flex-1" v-model={model} options={options}></PickerColumn>
                }}
            </For>
        </Flex>
    )
})
