## 解决方案

1. 触屏统一：https://www.npmjs.com/package/@vant/touch-emulator

## 组件分级

1. 一阶基础组件
    1. 主要作为单个元素展示
    2. 或者承接用户输入
    3. 对外具有高度的可扩展性
2. 二阶组合组件
    1. 自动完成布局操作
    2. 采用 Slot 进行局部修改
3. 三阶容器组件
    1. 封装所有动画
    2. 兼顾响应式布局
4. 四阶配置式组件
    1. 无需接触主要布局
    2. 只需注入数据和配置
    3. 由配置文件直接决定效果

## TODO

### 布局

-   [x] 1 Flex
-   [x] 1 Grid
-   [x] 1 Layout
-   [ ] 1 Space
-   [x] 1 Splitter

-   [x] 1 Virtual List
-   [ ] 1 Infinite Scroll
-   [x] 1 Modal

-   [x] 2 Tabs
-   [x] 3 ChatBox
-   [ ] 3 Gallery
-   [ ] 3 AppShell https://mantine.dev/app-shell/?e=Headroom
-   [x] 3 WaterFall

### 流组件

-   [x] 1 Code
-   [x] 1 Button
-   [x] 1 Float Button
-   [ ] 1 Link
-   [x] 1 Icon
-   [ ] 1 Divider
-   [x] 1 Avatar
-   [ ] 1 Badge
-   [x] 1 Image
    -   [ ] Image Preview
-   [x] 1 Tag
-   [ ] 1 Time Label

### 内容组件

-   [ ] 1 Card
-   [ ] 1 Progress
-   [ ] 1 Carousel
-   [ ] 1 QRCode
-   [ ] 1 Statistic
-   [ ] 1 GroupList
-   [ ] 2 Watermark

-   [x] 2 Collapse
-   [ ] 3 Timeline
-   [ ] 4 Tree
-   [ ] 4 Description
-   [ ] 4 Calendar
-   [x] 4 Table

### 状态组件

-   [ ] 1 Skeleton
-   [ ] 1 Empty
-   [x] 1 Spin
-   [x] 1 Loading
-   [ ] 1 Result

### 表单组件

-   [ ] 1 Segmented
-   [ ] 1 Toggle Group
-   [x] 1 Checkbox
    -   [x] 1 Radio
-   [x] 1 DatePicker
-   [x] 1 Input
-   [x] 1 InputNumber
-   [x] 1 Picker
-   [x] 1 Select

-   [ ] 1 AutoComplete
-   [ ] 1 ColorPicker
-   [ ] 1 Mentions
-   [ ] 1 Rate
-   [ ] 1 Slider
-   [ ] 1 Switch
-   [ ] 1 TimePicker
-   [ ] 1 Transfer
-   [ ] 1 TreeSelect
-   [ ] 1 Pin Input
-   [ ] 4 Upload
-   [ ] 4 Cascader
-   [ ] 4 Form

### 导航组件

-   [x] 3 Pagination
-   [ ] 3 Anchor
-   [ ] 2 Breadcurmb
-   [ ] 3 Menu
-   [ ] 3 Steps
-   [ ] 3 Affix

### 高阻抗模态框

-   [ ] 1 Drawer
-   [x] 1 Dialog
-   [ ] 4 Commander SearchBox
-   [ ] 4 Tour

### 低阻抗模态框

-   [ ] 1 Tooltip
-   [ ] 1 Popconfirm
-   [x] 1 Popover
-   [ ] 1 ContextMenu
-   [ ] 1 Dropdown

### 消息组件

-   [ ] 2 Message
-   [ ] 2 Notification
-   [ ] 2 Alert
-   [ ] 2 Toast
-   [ ] 2 ProgressBar
