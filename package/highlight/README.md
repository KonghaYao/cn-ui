# @cn-ui/highlight

A Code Highlight Component base on SolidJS

```sh
pnpm i @cn-ui/highlight prism-themes solid-js @cn-ui/use
```

```tsx
// recommend to use prism-themes
import 'prism-themes/themes/prism-atom-dark.css';
import { Code, refractor } from '@cn-ui/highlight';
// refractor is a syntax transformer!
// https://www.npmjs.com/package/refractor#example-serializing-hast-as-html

export default (props) => {
    return (
        <div>
            <Code lang="ts">{'// TS code'}</Code>
        </div>
    );
};
```
