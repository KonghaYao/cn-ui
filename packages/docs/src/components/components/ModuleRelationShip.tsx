// import relationship from "@cn-ui/core/dist/relationShip.json";
const relationShip = [];
import { NullAtom } from "@cn-ui/reactive";
import { GraphChart } from "echarts/charts";
import { TitleComponent } from "echarts/components";
import { GridComponent, LegendComponent } from "echarts/components";
import { init, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { onMount } from "solid-js";
use([TitleComponent, LegendComponent, GridComponent, GraphChart, CanvasRenderer]);
const categories = new Set<string>();
const size: Record<string, number> = {};
const getCategory = (label: string) => {
    if (label === "null") {
        return "null";
    } else if (label.startsWith("/")) {
        return label.replace(/^\/+(.*?)\/.*/, "$1");
    }
    return label;
};

const json = {
    edges: relationship.map(([from, to]) => {
        if (size[to]) {
            size[to]++;
        } else {
            size[to] = 1;
        }
        return {
            source: from,
            target: to,
        };
    }),
    nodes: [...new Set(relationship.flatMap((i) => i))].map((i) => {
        const label = i.split("src")?.[1] ?? i;
        const cate = getCategory(label);
        categories.add(cate);
        return {
            id: i,
            name: label,
            label: {
                show: size[i] >= 5 ? true : undefined,
            },
            symbolSize: size[i] * 10 || 5,
            category: cate,
        };
    }),
};

export const ModuleRelationShip = () => {
    const dom = NullAtom(null);
    onMount(() => {
        const chartDom = dom();
        const myChart = init(chartDom);
        const cateList = [...categories.values()];
        myChart.setOption(
            {
                title: {
                    text: "@cn-ui/core Dependencies",
                    bottom: 2,
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: "quinticInOut",

                series: [
                    {
                        type: "graph",
                        zoom: 0.8,
                        categories: cateList.map((i, index) => ({
                            name: i,
                        })),
                        data: json.nodes.map(function (node) {
                            return {
                                ...node,
                                category: cateList.indexOf(node.category),
                            };
                        }),
                        selectedMode: "multiple",
                        layout: "circular",
                        circular: {
                            rotateLabel: true,
                        },
                        edgeSymbol: ["none", "arrow"],
                        links: json.edges,
                        emphasis: {
                            focus: "adjacency",
                        },
                        label: {
                            show: true,
                        },
                        lineStyle: {
                            color: "source",
                            curveness: 0.3,
                        },
                    },
                ],
            },
            true,
        );
    });
    return <div ref={dom} class="h-256 w-256" />;
};
