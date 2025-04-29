import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <h1 className="text-4xl font-bold text-blue-600">Hello Tailwind + React!</h1>
    </div>
    </>
  )
}

export default App
