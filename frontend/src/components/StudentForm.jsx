import { useState, useEffect } from 'react'

export default function StudentForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || '',
        email: initial.email || '',
        phone: initial.phone || '',
        dateOfBirth: initial.dateOfBirth
          ? initial.dateOfBirth.split('T')[0]
          : '',
        address: initial.address || '',
      })
    }
  }, [initial])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) return setErrors(e2)
    onSubmit(form)
  }

  const field = (label, key, type = 'text', required = false) => (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">
        {label}{required && <span className="text-terracotta"> *</span>}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        className="w-full bg-paper border border-parchment rounded-sm px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-ledger transition-colors"
      />
      {errors[key] && <p className="text-terracotta text-xs mt-1 font-mono">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-[2px] flex items-center justify-center z-50 px-4">
      <div className="bg-paper rounded-sm shadow-2xl w-full max-w-md border border-parchment overflow-hidden">
        {/* Card header strip */}
        <div className="px-8 pt-7 pb-5 border-b border-parchment flex justify-between items-baseline">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
              {initial ? `Record No. ${String(initial.id).padStart(3, '0')}` : 'New Entry'}
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {initial ? 'Edit Student Record' : 'Enroll Student'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-ink text-lg leading-none -mt-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
          {field('Full Name', 'name', 'text', true)}
          {field('Email Address', 'email', 'email', true)}
          <div className="grid grid-cols-2 gap-4">
            {field('Phone', 'phone')}
            {field('Date of Birth', 'dateOfBirth', 'date')}
          </div>
          {field('Address', 'address')}

          <div className="flex gap-3 justify-end pt-4 border-t border-parchment">
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 border border-parchment rounded-sm hover:border-ink/40 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 bg-ledger text-paper rounded-sm hover:bg-ledgerDark transition-colors shadow-sm"
            >
              {initial ? 'Save Changes' : 'Add to Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}