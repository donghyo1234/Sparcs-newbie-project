import React from "react"
import styled from "styled-components"

const MainBannerWrapper = styled.div``

const InternalGridWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`

const TopLine = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  border-bottom: dotted 1px ${({ theme }) => theme.colors.STROKE_LIGHT};

  height: 60px;
`

const CenterPiece = styled.div`
  border-left: dotted 1px ${({ theme }) => theme.colors.STROKE_LIGHT};
  border-right: dotted 1px ${({ theme }) => theme.colors.STROKE_LIGHT};

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  gap: 10px;

  position: relative;
`

const NewbieFlex = styled.p`
  color: ${({ theme }) => theme.colors.GREY03};
  background: ${({ theme }) => theme.colors.BG_LIGHT};
  padding: 4px 10px;
  border-radius: 8px;
  height: fit-content;
`

const TitleLine = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  border-bottom: dotted 1px ${({ theme }) => theme.colors.STROKE_LIGHT};
  height: 120px;
`

const ServiceTitle = styled.h1`
  font-family: "Raleway";
  font-weight: 800;
  font-size: 68px;

  position: relative;
  transform: translate(0, 0);

  &::before {
    position: absolute;
    left: -15px;
    right: -15px;
    bottom: -5px;
    height: 25px;
    background: ${({ theme }) => theme.colors.SPARCS};
    opacity: 0.15;
    content: "";
  }

  @media screen and (max-width: 1068px) {
    font-size: 60px;
  }

  @media screen and (max-width: 900px) {
    font-size: 40px;

    &::before {
      left: -10px;
      right: -10px;
      height: 15px;
    }
  }
`

const DescriptionLine = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  border-bottom: dotted 1px ${({ theme }) => theme.colors.STROKE_LIGHT};
  height: 200px;
`

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.GREY02};
  font-size: 18px;
  padding: 0 50px;
  line-height: 1.5;
  position: relative;

  @media screen and (max-width: 900px) {
    padding: 0 20px;
    font-size: 16px;
    text-align: center;
  }
`
const BoldText = styled.span`
  font-weight: 600;
`

const LineStop = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.BG_LIGHT};
  position: absolute;
  bottom: 30px;
  right: 40px;

  border-radius: 4px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`

const BottomLine = styled.div`
  display: grid;
  grid-template-columns: 51px 1fr 1fr 1fr 50px;
  height: 40px;

  & > div:not(:last-child) {
    border-right: dotted 1px ${({ theme }) => theme.colors.STROKE_LIGHT};
  }
`

export const MainBanner = () => {
  return <MainBannerWrapper>
    <InternalGridWrapper>
      <TopLine>
        <div/>
        <CenterPiece>
          <NewbieFlex># SPARCS 23 Spring</NewbieFlex>
          <NewbieFlex># Newbie Project</NewbieFlex>
          <NewbieFlex># Example</NewbieFlex>
        </CenterPiece>
        <div/>
      </TopLine>
      <TitleLine>
        <div/>
        <CenterPiece>
          <ServiceTitle>SPARCS Banking Service</ServiceTitle>
        </CenterPiece>
        <div/>
      </TitleLine>
      <DescriptionLine>
      <div/>
        <CenterPiece>
          <ServiceDescription>
            스팍스의 기술력이 집약된 새로운 은행의 패러다임으로, <BoldText>최신 웹 기술</BoldText> 및 <BoldText>디지털 금융의 혁신</BoldText>을 통해 고객 분들께 새로운 가치를 제공해 드리고 있습니다. 
            <BoldText> 2000+</BoldText> 여 개의 회사가 이미 <BoldText>SPARCS Banking Service</BoldText>를 이용하여 가치를 창출하고 있으며, Web 3.0, IoT, DOT DOT Framework 로의 진출을 원하는 고객 분들을 위한 최고의 솔루션 입니다.
            여러분들의 금융, SPARCS와 함께라면 멋진 여정이 될 수 있습니다. 지금 바로 SPARCS Banking Service의 세계로 빠져 보세요.
          </ServiceDescription>
          <LineStop/>
        </CenterPiece>
        <div/>
      </DescriptionLine>
      <BottomLine>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </BottomLine>
    </InternalGridWrapper>
  </MainBannerWrapper>
}
