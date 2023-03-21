# 这些按顺序即可
# pnpm --filter "@cn-ui/reactive" build
# pnpm --filter "@cn-ui/use" build
# pnpm --filter "@cn-ui/transition" build
# pnpm --filter "@cn-ui/animate" build
# pnpm --filter "@cn-ui/headless" build
# pnpm --filter "@cn-ui/core" build

# pnpm --filter "@cn-ui/viewer" build
pnpm --filter=!@cn-ui/reactive  --filter=!@cn-ui/use --filter=!@cn-ui/transition --filter=!@cn-ui/animate --filter=!@cn-ui/headless --filter=!@cn-ui/core build
