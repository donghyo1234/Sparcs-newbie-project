import styled from "styled-components"

export const Divider = styled.div`
  width: 100%;
  border-top: dashed 1px ${({ theme }) => theme.colors.STROKE_LIGHT};
`