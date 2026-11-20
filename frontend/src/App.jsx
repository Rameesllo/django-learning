
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Fetch welcome data
  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.error(error))
  }, [])

  // Fetch tasks from Django API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/tasks/')
      .then(response => response.json())
      .then(result => setTasks(result))
      .catch(error => console.error('Error fetching tasks:', error))
  }, [])

  // Dashboard statistics
  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    task => task.status === 'completed'
  ).length

  // Handle create button
  const handleCreateTask = () => {

  fetch('http://127.0.0.1:8000/api/tasks/', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      title: title,
      description: description,
      status: 'pending'
    })

  })
    .then(response => response.json())
    .then(result => {
      console.log('Task created:', result)
    })
    .catch(error => {
      console.error('Error creating task:', error)
    })

}

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <header className="border-b bg-white px-8 py-5">
        <h1 className="text-2xl font-bold text-emerald-700">
          DevTrack
        </h1>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">

        <h2 className="text-3xl font-bold">
          Good morning
        </h2>

        <p className="mt-2 text-gray-500">
          {data?.message || 'Welcome to your workspace'}
        </p>

        {/* Dashboard Statistics */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">Total Tasks</p>
            <h3 className="mt-2 text-3xl font-bold">
              {totalTasks}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">Completed Tasks</p>
            <h3 className="mt-2 text-3xl font-bold text-emerald-600">
              {completedTasks}
            </h3>
          </div>

        </div>

        {/* Recent Tasks */}
        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Recent Tasks
            </h2>

            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
            >
              + Add Task
            </button>
          </div>

          {/* Create Task Form */}
          {showForm && (
            <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">

              <h3 className="mb-4 text-lg font-bold">
                Create New Task
              </h3>

              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-3 w-full rounded-lg border p-3"
              />

              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-3 w-full rounded-lg border p-3"
              />

              <button
                onClick={handleCreateTask}
                className="rounded-lg bg-emerald-600 px-5 py-2 text-white"
              >
                Create Task
              </button>

            </div>
          )}

          {/* Task List */}
          <div className="space-y-3">

            {tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl border bg-white p-5"
              >
                <div>
                  <h3 className="font-medium">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {task.description}
                  </p>
                </div>

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
