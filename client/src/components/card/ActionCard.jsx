import styled from "styled-components"

export const ActionCard = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.colors.SPARCS_BG}, -1px -1px 10px 1px ${({ theme }) => theme.colors.ARA_RED_BG};
  padding: 10px;

  background: ${({ theme }) => theme.colors.WHITE};

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  transition: transform 100ms ease;
`