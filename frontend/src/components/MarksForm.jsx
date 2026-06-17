import { useState, useEffect } from 'react'

export default function MarksForm({ initial, studentId, onSubmit, onClose }) {
  const [form, setForm] = useState({
    subject: '',
    score: '',
    grade: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) {
      setForm({
        subject: initial.subject || '',
        score: initial.score || '',
        grade: initial.grade || '',
      })
    }
  }, [initial])

  const validate = () => {
    const e = {}
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.score === '') e.score = 'Score is required'
    else if (isNaN(form.score) || form.score < 0 || form.score > 100)
      e.score = 'Score must be between 0 and 100'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) return setErrors(e2)
    onSubmit({ ...form, studentId })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {initial ? 'Edit Mark' : 'Add Mark'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <input
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Score * (0-100)</label>
            <input
              type="number"
              value={form.score}
              onChange={e => setForm({ ...form, score: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.score && <p className="text-red-500 text-xs mt-1">{errors.score}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
            <input
              value={form.grade}
              onChange={e => setForm({ ...form, grade: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {initial ? 'Update' : 'Add Mark'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}