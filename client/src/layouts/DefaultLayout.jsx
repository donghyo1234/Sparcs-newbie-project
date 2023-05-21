import styled from "styled-components"
import PropTypes from "prop-types"
import Header from "../components/layout/Header"

const DefaultLayoutWrapper = styled.div``

const DefaultLayout = (props) => {
  return <DefaultLayoutWrapper>
    <Header/>
    { props.children }
  </DefaultLayoutWrapper>
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default DefaultLayout

