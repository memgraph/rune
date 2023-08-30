import React from "react";
import ControlBar from "../../../components/ControlBar/ControlBar";
import * as S from "../Main.styles";

interface DataBlockProps {
  state: number;
  children: React.ReactNode;
  expandCallback: () => void;
  shrinkCallback: () => void;
  closeCallback: () => void;
}

const DataBlock = React.forwardRef<HTMLDivElement, DataBlockProps>(
  ({ state, children, expandCallback, shrinkCallback, closeCallback }, ref) => (
    <S.DataBlock state={state} ref={ref}>
      <S.ControlBlock>
        <ControlBar
          expandCallback={expandCallback}
          shrinkCallback={shrinkCallback}
          closeCallback={closeCallback}
        />
      </S.ControlBlock>
      {children}
    </S.DataBlock>
  )
);

export default DataBlock;
