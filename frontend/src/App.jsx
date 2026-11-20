
import { useEffect, useState } from 'react'



function App() {
  const [data, setData] = useState(null)
  const [tasks , setTasks] = useState([])
  const [showForm , setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.error(error))
  }, [])

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/tasks/')
    .then(response => response.json())
    .then(result => setTasks(result))
    .catch(error => console.error('error fetching tasks:', error))
  }, [])

  const totalTasks = tasks.length

const completedTasks = tasks.filter(
  task => task.status === 'completed'
).length

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <header className="border-b bg-white px-8 py-5">
        <h1 className="text-2xl font-bold text-emerald-700">
          DevTrack
        </h1>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">

        <h2 className="text-3xl font-bold">
          Good morning.....1
        </h2>

        <p className="mt-2 text-gray-500">
          {data?.message || 'Welcome to your workspace'}
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">Total Tasks.</p>
            <h3 className="mt-2 text-3xl font-bold">{totalTasks}</h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">Completed Tasks</p>
            <h3 className="mt-2 text-3xl font-bold text-emerald-600">
              {completedTasks}
            </h3>
          </div>

        </div>

        <section className="mt-10">

          <h2 className="mb-5 text-xl font-bold ">
            Recent Tasks.
          </h2>

          <button className="rounded-lg bg-emerald-600 px-4 py-2 ml-216 mb-1 text-white"
            onClick={() => setShowForm(!showForm)}
          >
            + Add Task
          </button>

          {showForm && (
  <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
    <h3 className="mb-4 text-lg font-bold">
      Create New Task
    </h3>

    <input
      type="text"
      placeholder="Enter task title"
      className="mb-3 w-full rounded-lg border p-3"
    />

    <textarea
      placeholder="Enter task description"
      className="mb-3 w-full rounded-lg border p-3"
    />

    <button className="rounded-lg bg-emerald-600 px-5 py-2 text-white">
      Create Task
    </button>
  </div>
)}


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
