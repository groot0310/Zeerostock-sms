import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import StudentForm from '../components/StudentForm'
import Pagination from '../components/Pagination'
import ConfirmDialog from '../components/ConfirmDialog'

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [meta, setMeta] = useState(null)
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editStudent, setEditStudent] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchStudents = async (p = 1) => {
    setLoading(true)
    try {
      const res = await API.get(`/students?page=${p}&limit=10`)
      setStudents(res.data.data)
      setMeta(res.data.meta)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStudents(page) }, [page])

  const handleAdd = async (form) => {
    try {
      await API.post('/students', form)
      setShowForm(false)
      fetchStudents(page)
    } catch (err) {
      alert(err.response?.data?.message || 'Could not add student')
    }
  }

  const handleEdit = async (form) => {
    try {
      await API.put(`/students/${editStudent.id}`, form)
      setEditStudent(null)
      fetchStudents(page)
    } catch (err) {
      alert(err.response?.data?.message || 'Could not update student')
    }
  }

  const handleDelete = async () => {
    try {
      await API.delete(`/students/${deleteId}`)
      setDeleteId(null)
      fetchStudents(page)
    } catch (err) {
      alert('Could not delete student')
    }
  }

  const initials = (name) =>
    name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join('')

  const gradeStamp = (count) => {
    if (count === 0) {
      return <span className="font-mono text-xs text-muted">—</span>
    }
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-ledger/30 text-ledger font-mono text-[11px] font-medium">
        {count}
      </span>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-baseline mb-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-1">
            Academic Year {new Date().getFullYear()}
          </p>
          <h1 className="font-display text-4xl font-semibold text-ink tracking-tight">
            Roll Register
          </h1>
          <p className="text-sm text-muted mt-2">
            {meta ? `${meta.total} student${meta.total === 1 ? '' : 's'} currently on record` : 'Loading record…'}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="font-mono text-xs uppercase tracking-wider px-5 py-3 bg-ledger text-paper rounded-sm hover:bg-ledgerDark transition-colors shadow-sm"
        >
          + Enroll Student
        </button>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <p className="font-mono text-sm text-muted">Loading register…</p>
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-28 border-t-2 border-b-2 border-ink/10">
          <p className="font-display text-2xl text-ink">The register is empty</p>
          <p className="text-sm text-muted mt-2">Enroll your first student to begin the record.</p>
          <button
            onClick={() => setShowForm(true)}
            className="font-mono text-xs uppercase tracking-wider mt-6 px-5 py-2.5 border border-ledger text-ledger rounded-sm hover:bg-ledger hover:text-paper transition-colors"
          >
            + Enroll Student
          </button>
        </div>
      ) : (
        <div>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-ink">
                <th className="py-3 text-left font-mono text-[11px] uppercase tracking-wider text-muted w-12">No.</th>
                <th className="py-3 text-left font-mono text-[11px] uppercase tracking-wider text-muted">Student</th>
                <th className="py-3 text-left font-mono text-[11px] uppercase tracking-wider text-muted">Email</th>
                <th className="py-3 text-left font-mono text-[11px] uppercase tracking-wider text-muted">Phone</th>
                <th className="py-3 text-center font-mono text-[11px] uppercase tracking-wider text-muted">Marks</th>
                <th className="py-3 text-right font-mono text-[11px] uppercase tracking-wider text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr
                  key={s.id}
                  className="border-b border-parchment hover:bg-parchment/40 transition-colors group"
                >
                  <td className="py-4 font-mono text-muted">
                    {String((page - 1) * 10 + i + 1).padStart(2, '0')}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ink text-paper font-display text-xs font-semibold shrink-0">
                        {initials(s.name)}
                      </span>
                      <span className="font-medium text-ink">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-muted">{s.email}</td>
                  <td className="py-4 text-muted font-mono text-xs">{s.phone || '—'}</td>
                  <td className="py-4 text-center">{gradeStamp(s.marks.length)}</td>
                  <td className="py-4 text-right">
                    <div className="flex gap-4 justify-end font-mono text-xs uppercase tracking-wide opacity-60 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/students/${s.id}`)} className="text-ledger hover:underline">
                        View
                      </button>
                      <button onClick={() => setEditStudent(s)} className="text-ink/60 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => setDeleteId(s.id)} className="text-terracotta hover:underline">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      )}

      {showForm && (
        <StudentForm onSubmit={handleAdd} onClose={() => setShowForm(false)} />
      )}
      {editStudent && (
        <StudentForm
          initial={editStudent}
          onSubmit={handleEdit}
          onClose={() => setEditStudent(null)}
        />
      )}
      {deleteId && (
        <ConfirmDialog
          message="Remove this student from the register? Their marks will be removed too. This can't be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}