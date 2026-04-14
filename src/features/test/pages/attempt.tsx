import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Question = {
  id: number
  text: string
  options: string[]
}

export default function TestAttempt() {
  const { attemptId } = useParams()
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    fetch(`https://localhost:5001/api/test-attempt/${attemptId}`)
      .then(res => res.json())
      .then(data => setQuestions(data.questions))
  }, [attemptId])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test</h1>

      {questions.map(q => (
        <div key={q.id} className="mb-4 border p-3 rounded">
          <p>{q.text}</p>

          {q.options.map(opt => (
            <div key={opt}>
              <input type="radio" name={`q-${q.id}`} />
              <span className="ml-2">{opt}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}