import styled from "styled-components"

export const ButtonWrapper = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  position: relative;

  &:hover {
    &::before {
      position: absolute;
      top: -1px;
      bottom: -1px;
      left: -1px;
      right: -1px;
      background: rgba(0,0,0,0.1);
      content: "";
      border-radius: 30px;
    }
  }

  &:active {
    &::before {
      position: absolute;
      top: -1px;
      bottom: -1px;
      left: -1px;
      right: -1px;
      background: rgba(0,0,0,0.3);
      content: "";
      border-radius: 30px;
    }
  }
`

