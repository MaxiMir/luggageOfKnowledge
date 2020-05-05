import React from 'react'
import styled from 'styled-components'


const AppIconContainerStyles = styled.svg`
  margin-right: 5px
`

export const AppIconContainer = ({ children, ...settings }) => {
  const { width = 12, height = 12, viewBoxX = 0, viewBoxY = 0, viewBoxWidth = 12, viewBoxHeight = 12} = settings

  return (
    <AppIconContainerStyles
      width={ width }
      height={ height }
      viewBox={ `${ viewBoxX } ${ viewBoxY } ${ viewBoxWidth } ${ viewBoxHeight }` }
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      { children }
    </AppIconContainerStyles>
  )
}
