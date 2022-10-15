# @cn-ui/highlight

A Code Highlight Component base on SolidJS

```sh
pnpm i @cn-ui/highlight highlight.js solid-js @cn-ui/use
```

```tsx
// recommend to use
import 'highlight.js/styles/github-dark.css';
import { Code, lowlight } from '@cn-ui/highlight';
// lowlight is a syntax transformer!
// https://www.npmjs.com/package/lowlight

export default (props) => {
    return (
        <div>
            <Code lang="ts" code={'// TS code'}></Code>
        </div>
    );
};
```
