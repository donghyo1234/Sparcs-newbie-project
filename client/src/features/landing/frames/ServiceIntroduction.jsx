import React from "react"
import styled from "styled-components"
import { ActionCard } from "../../../components/card/ActionCard"
import { GradientText } from "../../../components/text/GradientText"
import { EmojiText } from "../../../components/text/EmojiText"
import { FlexContainer } from "../../../components/flex/FlexContainer"
import { Spacer } from "../../../components/utils/Spacer"
import { Divider } from "../../../components/utils/Divider"

// const MainLinkSectionWrapper = styled.div`
//   border-radius: 16px;
//   border: solid 1px transparent;
//   background: ${({ theme }) => theme.colors.WHITE}; 
//   width: 100%;
//   padding: 10px;
//   background-clip: padding-box;
//   position: relative;
//   margin: auto;

//   &:before {
//     content: '';
//     position: absolute;
//     top: 0; right: 0; bottom: 0; left: 0;
//     z-index: -1;
//     margin: -1px; 
//     border-radius: inherit; 
//     background: linear-gradient(to right, red, orange);
//   }
// `

const MainLinkSectionWrapper = styled.div`
  display: grid;
  padding: 0 8px;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 1000px){
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: auto;
  }
`

const DescriptionText = styled.p`
  padding: 4px;
  white-space: pre-line;
  line-height: 160%;
  color: ${({ theme }) => theme.colors.GREY03};
`

export const MainLinkSection = () => {
  return <MainLinkSectionWrapper>
    <ActionCard>
      <FlexContainer>
        <GradientText># 계좌 만들기</GradientText>
        <EmojiText>💳</EmojiText>
      </FlexContainer>
      <Spacer height={10} />
      <Divider/>
      <Spacer height={10} />
      <DescriptionText>
        직접 계좌를 만들어 SPARCS Bank 를 체험해 보세요! {"\n"}
        버튼 클릭 한 번이면 바로 만들 수 있습니다.
      </DescriptionText>
    </ActionCard>
    <ActionCard>
      <FlexContainer>
        <GradientText># 돈 빌리기</GradientText>
        <EmojiText>🧐</EmojiText>
      </FlexContainer>
      <Spacer height={10} />
      <Divider/>
      <Spacer height={10} />
      <DescriptionText>
        송금을 체험할 방법이 없다구요? {"\n"}
        까다로운 심사 없이, 바로 돈을 빌려 보세요.
      </DescriptionText>
    </ActionCard>
    <ActionCard>
      <FlexContainer>
        <GradientText># 송금하기</GradientText>
        <EmojiText>❤️</EmojiText>
      </FlexContainer>
      <Spacer height={10} />
      <Divider/>
      <Spacer height={10} />
      <DescriptionText>
        돈 주는 친구가 가장 좋은 친구죠. {"\n"}
        SPARCS Bank로 바로 친구들에게 돈을 보내 보세요!
      </DescriptionText>
    </ActionCard>
  </MainLinkSectionWrapper>
}

