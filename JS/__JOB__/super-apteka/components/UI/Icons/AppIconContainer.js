import React from 'react'
import styled from 'styled-components'


const AppIconContainerStyles = styled.svg`
  margin-right: 5px
`

export const AppIconContainer = ({ children, width = 14, height = 14, userWidth = 12, userHeight = 17 }) => (
  <AppIconContainerStyles
    width={ width }
    height={ height }
    viewBox={`0 0 ${userWidth} ${userHeight}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    { children }
  </AppIconContainerStyles>
)
