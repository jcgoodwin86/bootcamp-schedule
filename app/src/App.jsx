import { useState } from 'react'
import './App.css'
import jsonData from './assets/data.json'
import ModuleList from './components/ModuleList/ModuleList/ModuleList'

function App() {
  const [modulesData] = useState(jsonData)  

  return (
      <main>
        <h1>Scrimba Schedule App</h1>
          <ModuleList modulesData={modulesData} />
      </main>
  )
}

export default App
