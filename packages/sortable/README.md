# SortableList Component README

## Overview

The `SortableList` is a drag-and-drop sortable list component built with SolidJS and Sortable.js. It allows users to rearrange items within the list through drag-and-drop interactions, and it integrates seamlessly with reactive data, ensuring that both the data and the view are kept in sync.

## Features

-   **Reactive**: Utilizes atomic state management provided by `@cn-ui/reactive`.
-   **Configurable**: Supports all options from Sortable.js.
-   **Easy Integration**: Provides context sharing for unifying data sources across multiple components.
-   **Automatic Handling**: Automatically adds the necessary `data-id` attribute to each list item, simplifying the developer's task.

## Installation

Ensure your project has the following dependencies installed:

```bash
npm install @cn-ui/reactive solid-js sortablejs
```

## Usage

### Importing the Component

First, import the `SortableList` component into your component file:

```javascript
import { SortableList, SortableShared } from "@cn-ui/sortable";
```

### Basic Usage

```jsx
import { atom } from "@cn-ui/reactive";
import { SortableList, SortableShared } from "@cn-ui/sortable";
export default () => {
    const data = atom([
        {
            id: "223232",
            label: "info",
        },
        {
            id: "111",
            label: "info1",
        },
        {
            id: "222",
            label: "info2",
        },
    ]);
    return (
        <SortableList
            v-model={data}
            getId={(item) => {
                return item.label;
            }}
        >
            {(item) => {
                return <button>{item.label}</button>;
            }}
        </SortableList>
    );
};
```

### Props

-   **model** (required): A reactive array containing the list items.
-   **options**: An object with configuration options passed to Sortable.js.
-   **children** (required): A function that renders the list items, receiving the current item and its index as parameters.
-   **fallback**: Content to be displayed when the list is empty.
-   **getId**: A function to extract the unique identifier from the list item; defaults to using `item.id`.
-   **disabled**: A reactive boolean to control whether the sorting functionality is enabled or not.
-   **setData**: A function to set the data transfer object and the element being dragged.
-   **onSorted**: A callback function that is triggered after the sort operation, providing the updated list of items.

### Advanced Usage

You can also use the `SortableShared` context to share data and options among multiple `SortableList` instances. This is useful when you have multiple lists that need to share the same data source or configuration.

#### Example with Shared Context

```tsx
import { atom, computed, resource } from "@cn-ui/reactive";
import { SortableList, SortableShared } from "@cn-ui/sortable";
export default () => {
    const data = resource<{ data: { id: string; label: string }[] }>(
        async () =>
            Mock.mock({
                "data|10": [
                    {
                        id: "@id",
                        label: "@cname",
                    },
                ],
            }),
        { initValue: { data: [] } },
    );
    const modelLeft = computed(() => data().data.slice(0, 5));
    const modelRight = computed(() => data().data.slice(5));
    return (
        <>
            <Flex>
                <SortableShared.Provider value={{ sharedData: [modelLeft, modelRight] }}>
                    <SortableList
                        v-model={modelLeft}
                        options={{
                            group: "common",
                        }}
                    >
                        {(item) => {
                            return <div>{item.label}</div>;
                        }}
                    </SortableList>
                    <SortableList
                        v-model={modelRight}
                        options={{
                            group: "common",
                        }}
                    >
                        {(item) => {
                            return <div>{item.label}</div>;
                        }}
                    </SortableList>
                </SortableShared.Provider>
            </Flex>
            <Flex vertical>
                <button onclick={() => data.refetch()}>重置</button>
                <div>{JSON.stringify(modelLeft().map((i) => i.label))}</div>
                <div>{JSON.stringify(modelRight().map((i) => i.label))}</div>
            </Flex>
        </>
    );
};
```

### Customization

-   You can customize the appearance of the `SortableList` by passing additional props such as `class`, `style`, and event handlers via the `props` object.
-   The `RefreshData` function can be used to manually refresh the data if needed, although it's typically called automatically after a sort operation.

### Notes

-   Ensure that each item in the `v-model` array has a unique `id` property, or provide a custom `getId` function to avoid conflicts.
-   The `disabled` prop can be used to conditionally enable or disable the sorting functionality based on your application's logic.

By following these guidelines, you should be able to integrate and utilize the `SortableList` component effectively in your SolidJS applications.
