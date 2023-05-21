import styled from "styled-components"
import Dropdown from "../dropdown/Dropdown"
import { setAccount, useAccount } from "../../hooks/account"
import { useUser } from "../../hooks/user"
import AsyncSpinner from "../async/AsyncSpinner"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import { ButtonWrapper } from "../button/ButtonWrapper"

const HeaderWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;

  display: flex;

  justify-content: center;
  
  padding: 0 20px;
  border-bottom: solid 1px ${({ theme }) => theme.colors.STROKE};
  min-width: 600px;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const HeaderWrapperContainer = styled.div`
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  width: 100%;
  max-width: 1200px;
`

const HeaderWrapperTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background-image: linear-gradient(to right, #eba12a, #ff8a5e, #ff8094, #f587c3, #c997e1, #aaa6f2, #88b4fa, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
`

const LogoType = styled.p`
  font-size: 20px;
  font-weight: 400;
  padding-top: 1px;
`

const SparcsLogo = styled.span`
  font-family: "Raleway";
  font-weight: 800;
`

const NavLinkGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const LinkItem = styled.a`
  color: ${({ theme }) => theme.colors.GREY02};
`

const Header = () => {
  const { data: userData, isLoading, isError } = useUser()
  const { data: account } = useAccount()
  const setAccountMutate = setAccount() 

  return <HeaderWrapper>
    <HeaderWrapperTop/>
    <HeaderWrapperContainer>
    <LogoWrapper>
      <img src={"/Symbol_black.svg"} width={"14px"}/>
      <LogoType><SparcsLogo>SPARCS</SparcsLogo> Bank</LogoType>
    </LogoWrapper>
    <NavLinkGroup>
      <AsyncSpinner isLoading={isLoading} size={36}>
        { 
          userData && (userData.loggedIn ?  <>
            <LinkItem>송금하기</LinkItem>
            <LinkItem>계좌보기</LinkItem>
            <Dropdown options={[]} />
            <BiLogOut width={24}/>
          </> : <>
            <ButtonWrapper width={"70px"} height={"30px"}>
              <LinkItem>회원가입</LinkItem>
            </ButtonWrapper>
            <ButtonWrapper width={"40px"} height={"40px"}>
              <BiLogIn size={24} style={{ paddingRight: "3px" }}/>
            </ButtonWrapper>
          </> )
        }
      </AsyncSpinner>

    </NavLinkGroup>
    </HeaderWrapperContainer>
  </HeaderWrapper>
}

export default Header