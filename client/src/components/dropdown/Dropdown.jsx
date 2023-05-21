import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { useOnClickOutside } from "usehooks-ts"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"

const DropdownWrapper = styled.div`
  position: relative;
  width: ${({ width }) => width};
`

const SelectedItemContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #cccccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SelectedItemText = styled.p`
  
`


const Dropdown = (props) => {
  const [ open, setOpen ] = React.useState(false)
  const dropdownRef = React.useRef(null)

  useOnClickOutside(dropdownRef, () => {
    setOpen(false)
  })

  const selectedItemText = props.selected ?? ( props.placeholder ?? "옵션을 선택해 주세요" )

  return <DropdownWrapper width={ props.width } ref={dropdownRef}>
    <SelectedItemContainer>
      <SelectedItemText>{ selectedItemText }</SelectedItemText>
      { open ? <BiChevronUp width={16} /> : <BiChevronDown width={16} /> }
    </SelectedItemContainer>
  </DropdownWrapper>
}

Dropdown.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  selectedText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired
}

export default Dropdown