import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import { GraphContainer, GraphStyle } from "./Graph.styles";
import { Node, Edge } from "../../shared/types/graphTypes";
import { layout } from "../../shared/constants";

interface GraphProps {
  nodes: Node[];
  edges: Edge[];
  nodeClickCallback?: Function;
}

const Graph: React.FC<GraphProps> = ({ nodes, edges, nodeClickCallback }) => {
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    const handleNodeClick = (event: cytoscape.EventObject) => {
      if (nodeClickCallback) {
        nodeClickCallback(event.target);
      }
    };
    cyRef.current?.on("tapend", "node", handleNodeClick);
  }, [nodeClickCallback]);

  useEffect(() => {
    cyRef.current = cytoscape({
      container: document.getElementById("cy"),
      elements: { nodes: [], edges: [] },
      style: GraphStyle,
      layout: { name: layout },
      minZoom: 0.3,
      maxZoom: 2,
    });

    const handleWindowResize = () => {
      if (cyRef.current) {
        cyRef.current.layout({ name: layout }).run();
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      cyRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    const refreshGraph = () => {
      if (cyRef.current) {
        cyRef.current.elements().remove();
        cyRef.current.add([...nodes, ...edges]);
        cyRef.current.layout({ name: layout }).run();
      }
      cyRef.current?.resize();
    };

    refreshGraph();
  }, [nodes, edges]);

  return <GraphContainer id="cy" />;
};

export default Graph;
