import { RingLoader } from "react-spinners"
import PropTypes from "prop-types"
import styled from "styled-components"

const AsyncSpinnerWrapper = styled.div`
  width: 100%;
`

const AsyncSpinner = (props) => {
  return props.isLoading ? 
    <AsyncSpinnerWrapper>
      <RingLoader size={props.size}/>
    </AsyncSpinnerWrapper> :
    props.children
}

AsyncSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  children: PropTypes.node,
}

export default AsyncSpinner