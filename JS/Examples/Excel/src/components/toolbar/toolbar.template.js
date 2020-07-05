function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
    <div 
      class="button ${button.active ? 'active' : ''}"
      ${meta}
    >
      <i 
        class="material-icons"
        ${meta}
      >${button.icon}</i>
    </div>
  `
}

export function createToolbar(s) {
  const buttons = [
    {
      value: {textAlign: 'left'},
      icon: 'format_align_left',
      active: s['textAlign'] === 'left'
    },
    {
      value: {textAlign: 'center'},
      icon: 'format_align_justify',
      active: s['textAlign'] === 'center'
    },
    {
      value: {textAlign: 'right'},
      icon: 'format_align_right',
      active: s['textAlign'] === 'right'
    },
    {
      value: {fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold'},
      icon: 'format_bold',
      active: s['fontWeight'] === 'bold'
    },
    {
      value: {
        textDecoration: s['textDecoration'] === 'underline'
          ? 'none'
          : 'underline'
      },
      icon: 'format_underlined',
      active: s['textDecoration'] === 'underline'
    },
    {
      value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'},
      icon: 'format_italic',
      active: s['fontStyle'] === 'italic'
    }
  ]
  return buttons.map(toButton).join('')
}
