
import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(result => {
        setData(result)
      })
  }, [])

  return (
    <div>
      <h1>DevTrack</h1>

      {data ? (
        <div>
          <h2>{data.message}</h2>
          <p>Developer: {data.developer}</p>
          <p>Framework: {data.framework}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App
