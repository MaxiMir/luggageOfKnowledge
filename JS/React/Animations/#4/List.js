import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

export const List = ({items, onRemove}) => (
  <TransitionGroup component={'ul'}>
    {items.map(item => (
      <CSSTransition
        classNames={'os'}
        timeout={750}
        key={item.id}
      >
        <li onClick={() => onRemove(item.id)}>{item.title}</li>
      </CSSTransition>
    ))}
  </TransitionGroup>
)
