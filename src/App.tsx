import { useEffect, useState } from 'react'

import './App.css'
const backendUrl = 'https://clicker-backend-8wcb.onrender.com';

function App() {
  const id = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

  const [cookies, setCookies] = useState(0)
  const [username, setUsername] = useState('неизвестен')
  const [isBoosted, setIsBoosted] = useState(false)
  const [modifyer, setModifyer] = useState(1)

  const buyBoost = () => {
    setIsBoosted(true)
    setCookies((prev) => prev - 15)
    setModifyer((modifyer) => modifyer + 1)
  } 

  const handleClick = () => {
    
    setCookies((prev) => prev + modifyer)
    fetch(`${backendUrl}/api/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telegram_id: id }),
    });
  }

  useEffect(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    const id = tg.initDataUnsafe?.user?.id;
    const name = tg.initDataUnsafe?.user?.first_name || "гость";
    setUsername(name);

    // Загружаем прогресс
    fetch(`http://localhost:8000/api/progress/${id}`)
      .then((res) => res.json())
      .then((data) => setCookies(data.clicks || 0));
  }
}, []);

  return (
      <div className="card">
        <div>{'Привет, ' + username}</div>
        <div>{'Тортик кликер некоторый'}</div>
        
        {'Денег за клик: ' + modifyer}
        <button onClick={handleClick}>
          Денег: {cookies}
        </button>
        {isBoosted ?
          <button disabled>Куплено</button>
            : 
          <button disabled onClick={buyBoost}>
            улучшения не доступны
          </button>
        }
      </div>

  )
}

export default App
