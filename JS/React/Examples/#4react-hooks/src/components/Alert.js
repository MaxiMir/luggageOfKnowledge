import React, {useContext} from 'react' // хук useContext
import {AlertContext} from '../context/alert/alertContext'

export const Alert = () => {
  const {alert, hide} = useContext(AlertContext)
  // hide передаем в onClick
  if (!alert) return null

  return (
    <div
      className={`alert alert-${alert.type || 'secondary'} alert-dismissible`}
      role="alert"
    >
      {alert.text}
      <button type="button" className="close" aria-label="Close" onClick={hide}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}
