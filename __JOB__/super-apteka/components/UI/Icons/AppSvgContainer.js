import React from 'react'
import styled from 'styled-components'


const AppIconContainerStyles = styled.svg`
  margin-right: 5px
`

export const AppSvgContainer = ({ children, ...settings }) => {
  const { width, height, viewBoxWidth, viewBoxHeight, viewBoxX = 0, viewBoxY = 0 } = settings

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
