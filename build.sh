# 这些按顺序即可
pnpm --filter "@cn-ui/reactive" build
pnpm --filter "@cn-ui/use" build
pnpm --filter "@cn-ui/transition" build
pnpm --filter "@cn-ui/animate" build
pnpm --filter "@cn-ui/headless" build
pnpm --filter "@cn-ui/core" build
pnpm --filter "@cn-ui/viewer" build

pnpm --filter=!@cn-ui/reactive  --filter=!@cn-ui/use --filter=!@cn-ui/transition --filter=!@cn-ui/animate --filter=!@cn-ui/headless --filter=!@cn-ui/core --filter=!docs --filter=!demo --filter=!@cn-ui/monaco build

# 这个玩意的 ts 加装了 monaco 的代码，会非常大，所以设置为报错减小代码量
pnpm --filter "@cn-ui/monaco" build
# docs 文件夹并未打包，这个可以直接使用
