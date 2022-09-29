// You should import the CSS file.
import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';
import { Component } from 'solid-js';
type Options = Viewer.Options;
export const ViewModel: Component<Options> = (props) => {
    return (
        <div
            ref={(dom) => {
                const g = new Viewer(dom, props);
            }}
        ></div>
    );
};
