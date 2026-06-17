export default function MarksTable({ marks, onEdit, onDelete }) {
    if (!marks || marks.length === 0) {
      return (
        <p className="text-gray-500 text-sm py-4">No marks added yet.</p>
      )
    }
  
    return (
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 font-medium text-gray-600">Subject</th>
            <th className="px-4 py-3 font-medium text-gray-600">Score</th>
            <th className="px-4 py-3 font-medium text-gray-600">Grade</th>
            <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {marks.map(mark => (
            <tr key={mark.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-800">{mark.subject}</td>
              <td className="px-4 py-3 text-gray-800">{mark.score}</td>
              <td className="px-4 py-3">
                {mark.grade ? (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                    {mark.grade}
                  </span>
                ) : '—'}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(mark)}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(mark.id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }