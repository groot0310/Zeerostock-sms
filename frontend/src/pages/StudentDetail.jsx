import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import MarksForm from '../components/MarksForm'
import MarksTable from '../components/MarksTable'
import StudentForm from '../components/StudentForm'
import ConfirmDialog from '../components/ConfirmDialog'

export default function StudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showMarkForm, setShowMarkForm] = useState(false)
  const [editMark, setEditMark] = useState(null)
  const [deleteMarkId, setDeleteMarkId] = useState(null)
  const [showEditStudent, setShowEditStudent] = useState(false)

  const fetchStudent = async () => {
    try {
      const res = await API.get(`/students/${id}`)
      setStudent(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStudent() }, [id])

  const handleAddMark = async (form) => {
    try {
      await API.post('/marks', form)
      setShowMarkForm(false)
      fetchStudent()
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding mark')
    }
  }

  const handleEditMark = async (form) => {
    try {
      await API.put(`/marks/${editMark.id}`, form)
      setEditMark(null)
      fetchStudent()
    } catch (err) {
      alert('Error updating mark')
    }
  }

  const handleDeleteMark = async () => {
    try {
      await API.delete(`/marks/${deleteMarkId}`)
      setDeleteMarkId(null)
      fetchStudent()
    } catch (err) {
      alert('Error deleting mark')
    }
  }

  const handleEditStudent = async (form) => {
    try {
      await API.put(`/students/${id}`, form)
      setShowEditStudent(false)
      fetchStudent()
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating student')
    }
  }

  if (loading) return <p className="text-gray-500">Loading...</p>
  if (!student) return <p className="text-gray-500">Student not found.</p>

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="text-blue-600 hover:underline text-sm mb-6 flex items-center gap-1"
      >
        ← Back to Students
      </button>

      {/* Student Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
            <p className="text-gray-500 text-sm mt-1">{student.email}</p>
          </div>
          <button
            onClick={() => setShowEditStudent(true)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Edit Student
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
            <p className="text-gray-700 mt-1">{student.phone || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Date of Birth</p>
            <p className="text-gray-700 mt-1">
              {student.dateOfBirth
                ? new Date(student.dateOfBirth).toLocaleDateString()
                : '—'}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Address</p>
            <p className="text-gray-700 mt-1">{student.address || '—'}</p>
          </div>
        </div>
      </div>

      {/* Marks Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Marks</h2>
          <button
            onClick={() => setShowMarkForm(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Mark
          </button>
        </div>
        <MarksTable
          marks={student.marks}
          onEdit={setEditMark}
          onDelete={setDeleteMarkId}
        />
      </div>

      {showMarkForm && (
        <MarksForm
          studentId={parseInt(id)}
          onSubmit={handleAddMark}
          onClose={() => setShowMarkForm(false)}
        />
      )}
      {editMark && (
        <MarksForm
          initial={editMark}
          studentId={parseInt(id)}
          onSubmit={handleEditMark}
          onClose={() => setEditMark(null)}
        />
      )}
      {deleteMarkId && (
        <ConfirmDialog
          message="Delete this mark?"
          onConfirm={handleDeleteMark}
          onCancel={() => setDeleteMarkId(null)}
        />
      )}
      {showEditStudent && (
        <StudentForm
          initial={student}
          onSubmit={handleEditStudent}
          onClose={() => setShowEditStudent(false)}
        />
      )}
    </div>
  )
}