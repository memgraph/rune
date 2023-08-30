import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./Main.styles";
import PromptBar from "../../components/PromptBar/PromptBar";
import RepoInfo from "./components/RepoInfo";
import CodeDisplay from "./components/CodeDisplay";
import DataBlock from "./components/DataBlock";
import GraphDisplay from "./components/GraphDisplay";
import TutorialPopup from "../../components/TutorialPopup/TutorialPopup";
import { tutorialMessages } from "../../shared/constants";
import { fetchData } from "../../util/fetchData";

const Main: React.FC = () => {
  let { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [lang, setLang] = useState<string>("plaintext");
  const [firstBlockState, setFirstBlockState] = useState<number>(1);
  const [secondBlockState, setSecondBlockState] = useState<number>(1);
  const [promptVal, setPromptVal] = useState<{
    data: string;
    type: number;
    file?: string;
  }>({
    data: "",
    type: 0,
  });
  const [clicked, setClicked] = useState<any>(undefined);
  const repoDataBlock = useRef<HTMLDivElement>(null);
  const graphBlock = useRef<HTMLDivElement>(null);
  const codeDataBlock = useRef<HTMLDivElement>(null);
  const promptBlock = useRef<HTMLDivElement>(null);

  const steps = [
    {
      message: tutorialMessages[0],
      x: window.innerWidth / 2 - 140,
      y: 16,
    },
    {
      message: tutorialMessages[1],
      x: repoDataBlock.current?.offsetLeft || 0,
      y: repoDataBlock.current
        ? repoDataBlock.current.offsetTop + repoDataBlock.current.clientHeight
        : 0,
      direction: "bottom",
    },
    {
      message: tutorialMessages[2],
      x: graphBlock.current?.offsetLeft || 0,
      y: graphBlock.current
        ? graphBlock.current.offsetTop + graphBlock.current.clientHeight
        : 0,
      direction: "bottom",
    },
    {
      message: tutorialMessages[3],
      x: codeDataBlock.current
        ? codeDataBlock.current?.offsetLeft +
          codeDataBlock.current.clientWidth -
          280
        : 0,
      y: codeDataBlock.current ? codeDataBlock.current?.offsetTop : 0,
      direction: "top",
    },
    {
      message: tutorialMessages[4],
      x: promptBlock.current ? promptBlock.current.offsetLeft : 0,
      y: promptBlock.current ? promptBlock.current?.offsetTop - 16 : 0,
      direction: "bottom",
    },
  ];

  const nodeClickCallback = (node: any) => {
    setClicked(node);
  };

  const langCallback = (lang: string) => {
    setLang(lang);
  };

  const explainClickCallback = (text: string, file?: string) => {
    if (file) {
      setPromptVal({ data: text, type: 1, file: file });
    } else {
      setPromptVal({ data: text, type: 1 });
    }
  };

  const improveClickCallback = (text: string, file?: string) => {
    if (file) {
      setPromptVal({ data: text, type: 2, file: file });
    } else {
      setPromptVal({ data: text, type: 2 });
    }
  };

  useEffect(() => {
    fetchData("http://localhost:8000/knowledge_base/code/init_repo_from_api", {
      owner: owner,
      repo: repo,
    });
  }, [owner, repo]);

  useEffect(() => {
    if (secondBlockState !== 2 - firstBlockState)
      setSecondBlockState(2 - firstBlockState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstBlockState]);

  useEffect(() => {
    if (firstBlockState !== 2 - secondBlockState)
      setFirstBlockState(2 - secondBlockState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondBlockState]);

  return (
    <S.Container>
      <S.DataContainer>
        <DataBlock
          state={firstBlockState}
          expandCallback={() => setFirstBlockState(2)}
          shrinkCallback={() => setFirstBlockState(1)}
          closeCallback={() => setFirstBlockState(0)}
          ref={codeDataBlock}
        >
          <CodeDisplay
            clickedNode={clicked}
            explainClickCallback={explainClickCallback}
            improveClickCallback={improveClickCallback}
          />
        </DataBlock>
        <DataBlock
          state={secondBlockState}
          expandCallback={() => setSecondBlockState(2)}
          shrinkCallback={() => setSecondBlockState(1)}
          closeCallback={() => setSecondBlockState(0)}
          ref={repoDataBlock}
        >
          <RepoInfo
            repoName={repo}
            repoOwner={owner}
            langCallback={langCallback}
          />
        </DataBlock>
      </S.DataContainer>
      <S.GraphContainer>
        <GraphDisplay
          owner={owner}
          repo={repo}
          nodeClickCallback={nodeClickCallback}
          ref={graphBlock}
        />
        <S.PromptBlock ref={promptBlock}>
          <PromptBar promptData={promptVal} lang={lang} repo={repo || ""} />
        </S.PromptBlock>
      </S.GraphContainer>
      <TutorialPopup steps={steps} />
    </S.Container>
  );
};

export default Main;
