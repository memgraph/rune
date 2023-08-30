import React from "react";
import * as S from "./Home.styles";
import { AnimatedTextHue } from "../../shared/animations";
import Graph from "../../components/Graph/Graph";
import { edges, nodes } from "../../data/graphData";

const Home: React.FC = () => {
  return (
    <S.Container>
      <S.StartContainer>
        <S.TitleContainer>
          <S.Title>
            Magic<AnimatedTextHue>Graph</AnimatedTextHue>
          </S.Title>
          <S.Subtitle>
            <S.Logo /> Structuring data
          </S.Subtitle>
        </S.TitleContainer>
        <S.SearchBarAnimated $animationDuration="1s" />
        <S.DescriptionAnimated $animationDuration="0.8s">
          A powerful tool for structuring and analyzing GitHub data, powered by
          the
          <S.DescriptionLink href="https://memgraph.com/" target="_blank">
            <AnimatedTextHue> magic </AnimatedTextHue>
          </S.DescriptionLink>
          of graphs
        </S.DescriptionAnimated>
      </S.StartContainer>
      <S.DemoContainer>
        {/* TODO: demo graph + some realtime data visualization */}
        <S.GraphBlock>
          <Graph nodes={nodes} edges={edges} />
        </S.GraphBlock>
      </S.DemoContainer>
    </S.Container>
  );
};

export default Home;
