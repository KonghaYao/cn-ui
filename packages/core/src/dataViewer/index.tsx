import '@alenaksu/json-viewer'
import { Flex } from '../container'
import './json-viewer.css'
export const JSONViewer = (props: { data: any }) => {
    return (
        <Flex vertical align="start" class="border relative p-2 rounded-lg border-gray-400">
            <div class="absolute -top-3 right-4"> JSON Viewer</div>
            {/* @ts-ignore */}
            <json-viewer data={{ ...JSON.parse(JSON.stringify(props.data)) }}></json-viewer>
        </Flex>
    )
}
