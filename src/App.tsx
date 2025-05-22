import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isBoosted, setIsBoosted] = useState(false)
  const [modifyer, setModifyer] = useState(1)

  const buyBoost = () => {
    setIsBoosted(true)
    setCount((count) => count - 15)
    setModifyer((modifyer) => modifyer + 1)
  } 

  return (
      <div className="card">
        {'Тортик кликер некоторый'}
        {'Денег за клик: ' + modifyer}
        <button onClick={() => setCount((count) => count + modifyer)}>
          Денег: {count}
        </button>
        {isBoosted ?
          <button disabled>Куплено</button>
            : 
          <button disabled={count < 15} onClick={buyBoost}>
            Купить буст за 15 денег
          </button>
        }
      </div>

  )
}

export default App
