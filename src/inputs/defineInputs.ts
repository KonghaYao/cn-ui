import { Component } from 'solid-js'

declare global {
    interface MagicInputsRegister {}
}
export const MagicInputs = new Map<keyof MagicInputsRegister, () => Promise<{ defaut: Component }>>()
