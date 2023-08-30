import { useState } from "react";
import * as S from "./TutorialPopup.styles";

interface TutorialPopupProps {
  steps: { message: string; x: number; y: number; direction?: string }[];
}

const TutorialPopup: React.FC<TutorialPopupProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [disabled, setDisabled] = useState(
    localStorage.getItem("tutorial") === "never"
  );

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setDisabled(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      localStorage.setItem("tutorial", "never");
      setDisabled(true);
    }
  };

  const handleNever = () => {
    localStorage.setItem("tutorial", "never");
    setDisabled(true);
  };

  const getPrevText = () => {
    return currentStep === 0 ? "No" : "Previous";
  };

  const getNextText = () => {
    if (currentStep === 0) return "Yes";
    if (currentStep === steps.length - 1) return "Finish";
    return "Next";
  };

  return (
    <S.Popup
      x={steps[currentStep].x}
      y={steps[currentStep].y}
      disabled={disabled}
      direction={steps[currentStep].direction}
    >
      <S.PopupData>{steps[currentStep].message}</S.PopupData>
      <S.PopupControls>
        <S.PopupButton onClick={handlePrevious} disabled={currentStep === 1}>
          {getPrevText()}
        </S.PopupButton>
        <S.PopupButton onClick={handleNext}>{getNextText()}</S.PopupButton>
      </S.PopupControls>
      {currentStep === 0 && (
        <S.PopupButton onClick={handleNever}>Never</S.PopupButton>
      )}
    </S.Popup>
  );
};

export default TutorialPopup;
