import React, { useEffect, useMemo, useRef, useState } from "react";
import { CodeBlock, CodeStyle, RawCodeBlock } from "./CodeSnippet.styles";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import SelectionPopup from "../SelectionPopup/SelectionPopup";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface CodeSnippetProps {
  code: string;
  lang: string;
  explainCallback: Function;
  improveCallback: Function;
  raw?: boolean;
}

interface SelectionPopupProps {
  selectedText?: string;
  x: number;
  y: number;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  lang,
  explainCallback,
  improveCallback,
  raw,
}) => {
  const [popupData, setPopupData] = useState<SelectionPopupProps>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLPreElement>(null);
  const scrollToTop = () => {
    containerRef?.current?.scroll({
      behavior: "smooth",
      top: 0,
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [code]);

  const handleTextSelection = (event: React.MouseEvent) => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      const selectionRect = window
        .getSelection()
        ?.getRangeAt(0)
        ?.getBoundingClientRect();
      if (selectionRect && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        if (
          selectionRect.top - containerRect.top + window.scrollY > 0 &&
          selectionRect.top - containerRect.top + window.scrollY <
            containerRef.current.clientHeight
        ) {
          setPopupData({
            selectedText,
            x:
              selectionRect.left - containerRect.left + selectionRect.width / 2,
            y: selectionRect.top - containerRect.top + window.scrollY,
          });
        } else {
          setPopupData({ x: 0, y: 0 });
        }
      }
    } else {
      setPopupData({ x: 0, y: 0 });
    }
  };

  const PreWithRef = (preProps: any) => (
    <pre
      {...preProps}
      ref={containerRef}
      onMouseUpCapture={handleTextSelection}
      tabIndex={1}
      key={Math.random() * 2}
    />
  );

  const codeBlock = useMemo(
    () =>
      (lang === "md" && raw) || lang !== "md" ? (
        <CodeBlock
          language={lang}
          style={tomorrow}
          customStyle={CodeStyle}
          wrapLongLines={true}
          wrapLines={true}
          PreTag={PreWithRef}
          onScroll={handleTextSelection}
        >
          {code}
        </CodeBlock>
      ) : (
        <RawCodeBlock
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(code)),
          }}
        />
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [code, lang, raw]
  );

  return (
    <>
      {codeBlock}
      {popupData.selectedText && (
        <SelectionPopup
          {...popupData}
          explainCallback={explainCallback}
          improveCallback={improveCallback}
          direction="bottom"
        />
      )}
    </>
  );
};

export default CodeSnippet;
