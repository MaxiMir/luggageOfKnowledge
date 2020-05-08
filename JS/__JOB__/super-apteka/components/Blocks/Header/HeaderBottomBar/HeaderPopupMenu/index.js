import React from 'react'

import { HeaderPopupLeftMenu } from './HeaderPopupLeftMenu/';
import { HeaderPopupRightMenu } from './HeaderPopupRightMenu/';


export const HeaderPopupMenu = ({ isOpened }) => {
  const containerClass = isOpened ? 'container-fluid' : 'd-none';

  return (
    <div className={ containerClass }>
      <div className="row">
        <HeaderPopupLeftMenu/>
        <HeaderPopupRightMenu/>
      </div>
    </div>
  )
}
