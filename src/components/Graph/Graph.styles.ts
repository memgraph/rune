import styled from "styled-components";
import theme from "../../shared/theme";
import cytoscape from "cytoscape";

const priorityColors = {
    1: theme.colors["secondary-neutral"],
    2: theme.colors["accent-light"],
    3: theme.colors["accent"]
}

type priorityColorsKey = keyof typeof priorityColors;

export const GraphContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const GraphStyle = [
    {
        selector: "node",
        style: {
            label: "data(label)",
            color: theme.colors.secondary,
            width: (node: cytoscape.NodeSingular) =>
                (node.data("priority") * 10 + 10) + "px",
            height: (node: cytoscape.NodeSingular) =>
                (node.data("priority") * 10 + 10) + "px",
            "background-color": (node: cytoscape.NodeSingular) =>
                priorityColors[node.data("priority") as priorityColorsKey],
            "font-size": "8px",
        },
    },
    {
        selector: "edge",
        style: {
            "line-color": (edge: cytoscape.EdgeSingular) =>
                priorityColors[edge.target().data('priority') as priorityColorsKey],
            "target-arrow-color": theme.colors["secondary-neutral"],
            "target-arrow-shape": "triangle",
        },
    },
]