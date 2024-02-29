import '@univerjs/design/lib/index.css'
import '@univerjs/ui/lib/index.css'
import '@univerjs/sheets-ui/lib/index.css'
import '@univerjs/sheets-formula/lib/index.css'

import { IWorkbookData, Univer, Workbook } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverUIPlugin } from '@univerjs/ui'
import { NullAtom, OriginComponent, OriginDiv } from '@cn-ui/reactive'
import { onMount } from 'solid-js'
import { watch } from 'solidjs-use'

export const UniverSheet = OriginComponent<{ data: IWorkbookData }, HTMLDivElement>((props) => {
    const container = NullAtom<HTMLDivElement>(null)
    // univer instance
    const univerInstance = NullAtom<Univer>(null)
    const workbookInstance = NullAtom<Workbook>(null)
    /**
     * Initialize univer instance and workbook instance
     * @param data {IWorkbookData} document see https://univer.work/api/core/interfaces/IWorkbookData.html
     */
    function init(data: IWorkbookData) {
        const univer = new Univer({
            theme: defaultTheme
        })
        univerInstance(univer)

        univer.registerPlugin(UniverRenderEnginePlugin)
        univer.registerPlugin(UniverFormulaEnginePlugin)
        univer.registerPlugin(UniverUIPlugin, {
            container: container(),
            header: true,
            toolbar: true,
            footer: true
        })

        univer.registerPlugin(UniverDocsPlugin, {
            hasScroll: false
        })
        univer.registerPlugin(UniverDocsUIPlugin)

        univer.registerPlugin(UniverSheetsPlugin)
        univer.registerPlugin(UniverSheetsUIPlugin)
        univer.registerPlugin(UniverSheetsFormulaPlugin)

        workbookInstance(univer.createUniverSheet(data))
    }
    /**
     * Destroy univer instance and workbook instance
     */
    function destroyUniver() {
        univerInstance()?.dispose()
        univerInstance(null)
        workbookInstance(null)
    }
    /**
     * Get workbook data
     */
    function getData() {
        if (!workbookInstance()) {
            throw new Error('Workbook is not initialized')
        }
        return workbookInstance()?.save()
    }
    const rebuild = () => {
        destroyUniver()
        init(props.data)
    }
    onMount(rebuild)
    watch(() => props.data, rebuild)
    return <OriginDiv prop={props} ref={container}></OriginDiv>
})
