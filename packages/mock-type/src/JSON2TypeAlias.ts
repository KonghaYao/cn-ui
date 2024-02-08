import { run } from "json_typegen_wasm"

export const JSON2TypeAlias = (json: unknown): string => {
    return run('Root', JSON.stringify(json), JSON.stringify({
        output_mode: "typescript/typealias"
    }))
}