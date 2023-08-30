import { useEffect, useRef, useState } from "react";
import * as S from "./PromptBar.styles";
import { AnimatedRotate } from "../../shared/animations";
import { fetchData } from "../../util/fetchData";
import { prompts, subprompts } from "../../shared/constants";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface PromptBarProps {
  submitCallback?: Function;
  promptData?: { data: string; type: number; file?: string };
  lang: string;
  repo: string;
}

//TODO: connect to backend
const PromptBar: React.FC<PromptBarProps> = ({
  submitCallback,
  promptData,
  lang,
  repo,
}) => {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [type, setType] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const inputElement = useRef<HTMLLabelElement>(null);
  const elementBottom = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    elementBottom?.current?.scroll({
      behavior: "smooth",
      top: elementBottom?.current?.scrollHeight,
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, visible, loading, error]);

  useEffect(() => {
    if (promptData && promptData.data) {
      console.log(promptData.type);
      let val;
      if (promptData.file) {
        val =
          (promptData.type === 1
            ? subprompts["ExplainFile"]
            : subprompts["ImproveFile"]) + promptData.file;
      } else {
        val =
          (promptData.type === 1
            ? subprompts["Explain"]
            : subprompts["Improve"]) + promptData.data;
      }
      setValue(val);
      setType(promptData.type);
      inputElement.current?.focus();
      handleSubmit(false, promptData.type, val);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (
    regen: boolean,
    type: number,
    valueOverride?: string
  ) => {
    if (submitCallback) {
      submitCallback(value);
    }
    setValue("");
    let val = valueOverride || value;
    if ((val.trim() && !loading && !error) || regen) {
      if (!regen) {
        setChat((prevChat) => [...prevChat, val.trim()]);
      } else if (!error) {
        setChat((prevChat) => prevChat.slice(0, -1));
      }
      setVisible(true);
      setLoading(true);
      setError(false);
      setErrorMsg("");
      setType(type);
      let fetchUrl = "http://localhost:8000/knowledge_base/general/ask";
      let fetchBody = {};
      if (type === 0) {
        if (promptData?.data) setContent(promptData.data);
        fetchBody = {
          repo: {
            path: repo,
            type: "Code",
          },
          prompt: promptData?.data || content,
          type: "Code",
        };
      } else if (type === 1) {
        if (promptData?.data) setContent(promptData.data);
        fetchUrl =
          "http://localhost:8000/knowledge_base/text_analizer/code/explain";
        fetchBody = {
          content: promptData?.data || content,
        };
        console.log(fetchBody);
      } else if (type === 2) {
        if (promptData?.data) setContent(promptData.data);
        fetchUrl =
          "http://localhost:8000/knowledge_base/text_analizer/code/debug";
        fetchBody = {
          content: promptData?.data || content,
        };
      } else if (type === 3) {
        fetchUrl = `https://newsapi.org/v2/everything?q=${lang}&apiKey=${process.env.REACT_APP_NEWS_API_TOKEN}&language=en`;
        console.log(fetchUrl);
      }
      await fetchData(fetchUrl, fetchBody)
        .then((data) => {
          if (type === 3) {
            console.log(data);
            console.log(data.results);
            let answer = "";
            data.articles
              .slice(0, 10)
              .forEach((article: any, index: number) => {
                console.log(article);
                answer += `${index + 1}. [${article.title}](${article.url}) \n`;
              });
            setChat((prevChat) => [...prevChat, answer]);
          } else {
            setChat((prevChat) => [...prevChat, data.content]);
          }
        })
        .catch((e) => {
          setError(true);
          setErrorMsg(e.message);
        });
      setLoading(false);
    }
    setTimeout(() => {
      inputElement.current?.focus();
    }, 0);
  };

  const handlePromptClick = (msg: string, type: number) => {
    if (!loading && !error) {
      handleSubmit(false, type, msg);
      setTimeout(() => {
        inputElement.current?.focus();
      }, 0);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(false, 0);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    setVisible(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setVisible(false);
      }
    });
  };

  return (
    <S.PromptContainer onFocus={handleFocus} onBlur={handleBlur} tabIndex={0}>
      <S.PromptLabel htmlFor="prompt" ref={inputElement}>
        <S.PromptArea
          id="prompt"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type your query here"
          disabled={loading || error}
        />
        <S.PromptButtonContainer>
          <S.PromptSendBlock
            onClick={() => handleSubmit(false, 0)}
            disabled={loading || error}
          >
            <S.PromptSendIcon />
          </S.PromptSendBlock>
        </S.PromptButtonContainer>
      </S.PromptLabel>
      <S.PromptDropDown $isVisible={visible} ref={elementBottom}>
        <S.PromptDropDownMessages>
          {chat.map((msg, index) => {
            return (
              <S.PromptDropDownMessage key={msg + index}>
                <S.PromptIconBlock>
                  {index % 2 !== 0 ? (
                    <S.IconChatStyled />
                  ) : (
                    <S.IconUserStyled />
                  )}
                </S.PromptIconBlock>
                <S.PromptTextBlock
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(marked.parse(msg || "")),
                  }}
                />
              </S.PromptDropDownMessage>
            );
          })}
        </S.PromptDropDownMessages>
        {chat.length > 0 ? (
          <S.PromptDropDownInfo>
            {loading ? (
              <AnimatedRotate>
                <S.LoadingIcon />
              </AnimatedRotate>
            ) : null}
            {error ? (
              <>
                <S.PromptDropDownError>{errorMsg}</S.PromptDropDownError>
                <S.PromptDropDownRegenerateBlock
                  onClick={() => handleSubmit(true, type)}
                >
                  <S.PromptDropDownRegenerateIcon />
                  Regenerate response
                </S.PromptDropDownRegenerateBlock>
              </>
            ) : null}
            {!loading && !error ? (
              <S.PromptDropDownRegenerateBlock
                onClick={() => handleSubmit(true, type)}
              >
                <S.PromptDropDownRegenerateIcon />
                Regenerate response
              </S.PromptDropDownRegenerateBlock>
            ) : null}
          </S.PromptDropDownInfo>
        ) : null}
        {prompts ? (
          <S.PromptDropDownPrompts>
            {Object.keys(prompts).map((prompt) => {
              return (
                <S.PromptDropDownPrompt
                  key={prompt}
                  onClick={() =>
                    handlePromptClick(
                      prompts[prompt].message,
                      prompts[prompt].type
                    )
                  }
                  disabled={loading || error}
                >
                  {prompt}
                </S.PromptDropDownPrompt>
              );
            })}
          </S.PromptDropDownPrompts>
        ) : null}
      </S.PromptDropDown>
    </S.PromptContainer>
  );
};

export default PromptBar;
