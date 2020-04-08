import React, {useState} from 'react'

export default function App() {
  const [toggle, setToggle] = useState(true)

  return (
    <div className="container">
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <hr/>
      <div className={'blocks'}>
        {toggle && <div className="square blue">{toggle.toString()}</div>}
      </div>
    </div>
  )
}

