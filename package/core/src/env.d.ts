/// <reference types="vite/client" />

import { Component } from 'solid-js';

type Switch = {
    type: 'switch';
    default: boolean;
};
type Select<G = string> = {
    type: 'select';
    default: G;
    options: { value: G; label: string }[];
};

declare module '*.story.tsx' {
    export const Controller: Switch | Select | any[];
    export default Component;
}
