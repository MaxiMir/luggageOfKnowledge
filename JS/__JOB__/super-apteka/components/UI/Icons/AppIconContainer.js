import React from 'react'
import styled from 'styled-components'


const AppIconContainerStyles = styled.svg`
  margin-right: 5px
`

export const AppIconContainer = ({ children }) => (
  <AppIconContainerStyles
    width="12"
    height="12"
    viewBox="0 0 12 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    { children }
  </AppIconContainerStyles>
)
