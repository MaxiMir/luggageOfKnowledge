import React from 'react'
import styled from 'styled-components'

import { AppPhone } from '../../../UI/AppPhone'
import { AppLink } from '../../../UI/AppLink';
import { AppMessageIcon } from '../../../UI/Icons/AppMessageIcon'
import { THEME } from '../../../../theme'


const MessageLinkText = styled.span`
  color: ${ THEME.GREY_COLOR };
  font-size: 18px;
`

const ContactContainer = styled.div`
  height: 41px;
  margin-bottom: 13px;
`

export const FooterContacts = ({ pharmacyPhone }) => (
  <div className="d-flex flex-column">
    <ContactContainer className="d-flex align-items-center">
      <AppPhone
        phone={ pharmacyPhone }
        size="24px"
        color={ THEME.GREY_COLOR }
        withIcon={ true }
        isSmallIcon={ false }
        colorIcon={ THEME.GREY_COLOR }
      />
    </ContactContainer>

    <ContactContainer className="d-flex align-items-center">
      <AppLink>
        <AppMessageIcon/>
        <MessageLinkText>Написать нам</MessageLinkText>
      </AppLink>
    </ContactContainer>
  </div>
)
