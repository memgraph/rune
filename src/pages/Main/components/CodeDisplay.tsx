import { useEffect, useState } from "react";
import CodeSnippet from "../../../components/CodeSnippet/CodeSnippet";
import * as S from "../Main.styles";
import { fetchGithubData } from "../../../util/fetchGithubData";
import getFileExtension from "../../../util/getFileExtension";
import SelectionPopup from "../../../components/SelectionPopup/SelectionPopup";
import RadioSelect from "../../../components/RadioSelect/RadioSelect";
import { FileBox, FileCode2 } from "lucide-react";

interface CodeDisplayProps {
  clickedNode: any;
  explainClickCallback: (text: string, file?: string) => void;
  improveClickCallback: (text: string, file?: string) => void;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  clickedNode,
  explainClickCallback,
  improveClickCallback,
}) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [codeLoading, setCodeLoading] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<string>("");
  const [clicked, setClicked] = useState<string>("");
  const [isRaw, setIsRaw] = useState<boolean>(true);

  useEffect(() => {
    if (clickedNode && clickedNode.type === "file" && clickedNode.url) {
      const fetchCodeData = async () => {
        setSelected(null);
        setCodeLoading(true);
        setCodeError("");
        await fetchGithubData(clickedNode.url)
          .then((data) => setSelected(data))
          .catch((e) => setCodeError(e.message));
        setCodeLoading(false);
      };

      fetchCodeData();
    }
  }, [clickedNode]);

  const handleFileClick = () => {
    if (!codeError && !codeLoading && selected) setClicked(selected.name);
  };

  const handleRadioChange = (selected: string) => {
    if (selected === "Raw") {
      setIsRaw(true);
    } else {
      setIsRaw(false);
    }
  };

  const getCodeMessage = () => {
    if (codeLoading) return "Loading file...";
    if (codeError) return "Fetching error";
    if (selected) return selected.name;
    return "Select file from the graph";
  };

  const getCodeText = () => {
    if (codeLoading) return "Please wait";
    if (codeError) return "Please try again";
    if (selected) return atob(selected.content);
    return "And enjoy your code!";
  };

  const radioOptions = [
    { label: <FileCode2 />, value: "Raw", text: "Raw" },
    { label: <FileBox />, value: "Preview", text: "Preview" },
  ];

  const lang = selected?.name
    ? getFileExtension(selected.name) ?? "plaintext"
    : "plaintext";

  useEffect(() => {
    if (lang === "md") setIsRaw(true);
  }, [lang]);

  return (
    <>
      <S.CodeTitleBlock>
        <S.CodeTitleAnimated onClick={handleFileClick}>
          {getCodeMessage()}
        </S.CodeTitleAnimated>
        {lang === "md" ? (
          <RadioSelect
            options={radioOptions}
            defaultSelectedValue="Raw"
            onChange={handleRadioChange}
          />
        ) : null}
      </S.CodeTitleBlock>
      <SelectionPopup
        selectedText={clicked}
        x={0}
        y={72}
        direction="up"
        explainCallback={() =>
          explainClickCallback(atob(selected.content), selected.name)
        }
        improveCallback={() =>
          improveClickCallback(atob(selected.content), selected.name)
        }
        onBlurCallback={() => setClicked("")}
      />
      <CodeSnippet
        code={getCodeText()}
        lang={lang}
        explainCallback={explainClickCallback}
        improveCallback={improveClickCallback}
        raw={isRaw}
      />
    </>
  );
};

export default CodeDisplay;
