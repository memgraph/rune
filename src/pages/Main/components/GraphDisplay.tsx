import { useEffect, useState } from "react";
import Graph from "../../../components/Graph/Graph";
import * as S from "../Main.styles";
import { Edge, Node } from "../../../shared/types/graphTypes";
import { fetchGithubData } from "../../../util/fetchGithubData";
import shortenWord from "../../../util/shortenWord";
import { shortenedWordLength } from "../../../shared/constants";
import React from "react";

interface GraphDisplayProps {
  owner: string | undefined;
  repo: string | undefined;
  nodeClickCallback: (node: any) => void;
}

const GraphDisplay = React.forwardRef<HTMLDivElement, GraphDisplayProps>(
  ({ owner, repo, nodeClickCallback }, ref) => {
    const [data, setData] = useState<any>([]);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [expanded, setExpanded] = useState<string[]>([]);
    const [clickedNode, setClickedNode] = useState<any>(undefined);

    useEffect(() => {
      if (owner && repo) {
        const fetchRepoData = async () => {
          const result = await fetchGithubData(
            `https://api.github.com/repos/${owner}/${repo}/contents`
          );
          setData(result);
          const { nodeList, edgeList } = populateGraphData(
            result,
            repo,
            [
              {
                data: { id: `${repo}`, label: `${repo}`, priority: 3 },
              },
            ],
            []
          );
          setNodes(nodeList);
          setEdges(edgeList);
        };

        fetchRepoData();
      }
    }, [owner, repo]);

    useEffect(() => {
      console.log(clickedNode);
      if (clickedNode && clickedNode.type === "dir") {
        const handleNodeChange = async (node: any) => {
          if (!clickedNode) return;
          if (!expanded.includes(clickedNode.sha)) {
            setExpanded((prevExpanded) => [...prevExpanded, clickedNode.sha]);

            const result = await fetchGithubData(
              `https://api.github.com/repos/${owner}/${repo}/contents/${clickedNode.path}`
            );

            setData((prevData: any) => [...prevData, ...result]);

            const { nodeList, edgeList } = populateGraphData(
              result,
              clickedNode.sha,
              nodes,
              edges
            );

            setNodes(nodeList);
            setEdges(edgeList);
            return;
          }
        };
        handleNodeChange(clickedNode);
      }
    }, [data, edges, expanded, nodes, owner, repo, clickedNode]);

    const handleNodeClick = (node: any) => {
      if (node) {
        const nodeSha = node.data().id;
        const clickedNode = data.find((e: any) => e.sha === nodeSha);
        setClickedNode(clickedNode);
        nodeClickCallback(clickedNode);
      }
    };

    const populateGraphData = (
      result: any[],
      source: string,
      nodes: Node[],
      edges: Edge[]
    ) => {
      const nodeList: Node[] = [...nodes];
      const edgeList: Edge[] = [...edges];

      result.forEach((element: any) => {
        const nodeId = element.sha;
        nodeList.push({
          data: {
            id: nodeId,
            label: shortenWord(element.name, shortenedWordLength),
            priority: element.type === "dir" ? 2 : 1,
          },
        });
        edgeList.push({
          data: {
            id: `${source}-${nodeId}`,
            source: source,
            target: nodeId,
          },
        });
      });

      return { nodeList, edgeList };
    };

    return (
      <S.GraphBlock ref={ref}>
        <Graph
          nodes={nodes}
          edges={edges}
          nodeClickCallback={handleNodeClick}
        />
      </S.GraphBlock>
    );
  }
);

export default GraphDisplay;
