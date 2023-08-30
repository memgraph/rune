import React, { useEffect, useRef, useState } from "react";
import * as S from "./SelectionPopup.styles";

export interface SelectionPopupProps {
  selectedText?: string;
  x: number;
  y: number;
  explainCallback: Function;
  improveCallback: Function;
  direction?: string;
  onBlurCallback?: Function;
}

interface Copied {
  id: number;
  x: number;
  y: number;
}

const SelectionPopup: React.FC<SelectionPopupProps> = ({
  selectedText,
  x,
  y,
  explainCallback,
  improveCallback,
  direction,
  onBlurCallback,
}) => {
  const [isvisible, setIsvisible] = useState<boolean>(false);
  const [iscopied, setIscopied] = useState<Copied | null>(null);
  const copyRef = React.useRef<HTMLDivElement | null>(null);
  const popupContainer = useRef<HTMLDivElement>(null);

  const handleCopyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const buttonRect = copyRef.current?.getBoundingClientRect();
    if (buttonRect)
      setIscopied({
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      });

    setIsvisible(false);
    setTimeout(() => {
      setIscopied(null);
    }, 1000);
  };

  useEffect(() => {
    if (selectedText) {
      setIsvisible(true);
    }
  }, [selectedText]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popupContainer.current &&
        !popupContainer.current.contains(event.target)
      ) {
        if (onBlurCallback) onBlurCallback();
        setIsvisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onBlurCallback]);

  return (
    <>
      <S.Popup
        x={x}
        y={y}
        clientWidth={popupContainer.current?.clientWidth || 0}
        $isVisible={isvisible}
        ref={popupContainer}
        tabIndex={0}
        direction={direction}
      >
        <S.PopupButton
          onClick={() => {
            if (explainCallback) explainCallback(selectedText);
            setIsvisible(false);
          }}
        >
          <S.GraphIcon /> Explain
        </S.PopupButton>
        <S.PopupButton
          onClick={() => {
            if (improveCallback) improveCallback(selectedText);
            setIsvisible(false);
          }}
        >
          <S.ImproveIcon /> Improve
        </S.PopupButton>
        <S.PopupButton
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            navigator.clipboard.writeText(selectedText || "");
            handleCopyClick(e);
          }}
          ref={copyRef}
        >
          <S.CopyIcon /> Copy
        </S.PopupButton>
      </S.Popup>
      {iscopied && (
        <S.CopiedBlock key={iscopied.id} x={iscopied.x} y={iscopied.y}>
          Copied!
        </S.CopiedBlock>
      )}
    </>
  );
};

export default SelectionPopup;
