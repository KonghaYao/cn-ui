---
title: 'Astro 适配'
description: 'Lorem ipsum dolor sit amet'
pubDate: '2024/3/28'
heroImage: '/blog-placeholder-3.jpg'
---
## Astro 适配

```sh
npm i @cn-ui/core
pnpm i @cn-ui/core
```

### astro.onfig.mjs

```diff
// astro.cofnig.mjs
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [
        mdx(),
        sitemap(),
        solidJs(),
    ],
+   vite: {
+       // important for client:load
+       ssr: {
+           noExternal: ['solid-icons'],
+           resolve: {
+               externalConditions: ['solid', 'module']
+           }
+       }
+   }
})
```

### 添加基础的 CSS 文件 | Add Basic CSS File

```js
import '@cn-ui/core/dist/cn-uno.css'
```

### 快乐地使用组件！

```tsx
import { Button } from '@cn-ui/core'
export const MyComponent = () => {
    return <Button></Button>
}
```