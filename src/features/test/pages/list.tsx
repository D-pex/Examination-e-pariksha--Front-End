import { useEffect, useState } from "react"

type Test = {
  id: number
  title: string
  description: string
  duration: number
}

export default function List() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://localhost:5001/api/test")
      .then(res => res.json())
      .then(data => {
        setTests(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test List</h1>

      <div className="grid gap-4">
        {tests.map(test => (
          <div key={test.id} className="border p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold">{test.title}</h2>
            <p>{test.description}</p>
            <p>Duration: {test.duration} mins</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}