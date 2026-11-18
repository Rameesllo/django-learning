
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.error(error))
  }, [])

  const tasks = [
    { id: 1, title: 'Learn Django', status: 'In Progress' },
    { id: 2, title: 'Build React UI', status: 'Completed' },
    { id: 3, title: 'Connect PostgreSQL', status: 'Pending' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <header className="border-b bg-white px-8 py-5">
        <h1 className="text-2xl font-bold text-emerald-700">
          DevTrack
        </h1>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">

        <h2 className="text-3xl font-bold">
          Good morning.....
        </h2>

        <p className="mt-2 text-gray-500">
          {data?.message || 'Welcome to your workspace'}
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">Total Tasks</p>
            <h3 className="mt-2 text-3xl font-bold">03</h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">Completed Tasks</p>
            <h3 className="mt-2 text-3xl font-bold text-emerald-600">
              01
            </h3>
          </div>

        </div>

        <section className="mt-10">

          <h2 className="mb-5 text-xl font-bold">
            Recent Tasks
          </h2>

          <div className="space-y-3">

            {tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl border bg-white p-5"
              >
                <h3 className="font-medium">{task.title}</h3>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  {task.status}
                </span>
              </div>
            ))}

          </div>

        </section>

        <p className="mt-10 text-sm text-gray-400">
          Developer: {data?.developer || 'Loading...'}
        </p>

      </main>
    </div>
  )
}

export default App
