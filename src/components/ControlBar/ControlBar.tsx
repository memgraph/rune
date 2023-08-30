import * as S from "./ControlBar.styles";

interface ControlBarProps {
  closeCallback?: () => void;
  shrinkCallback?: () => void;
  expandCallback?: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  closeCallback,
  shrinkCallback,
  expandCallback,
}) => {
  return (
    <S.ControlContainer>
      <S.Close onClick={closeCallback} />
      <S.Shrink onClick={shrinkCallback} />
      <S.Expand onClick={expandCallback} />
    </S.ControlContainer>
  );
};

export default ControlBar;
