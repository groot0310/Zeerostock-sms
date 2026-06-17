import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 h-[58px] flex items-center px-7">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-3.5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] bg-slate-900 rounded-[10px] flex items-center justify-center shrink-0">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <span className="text-[15px] font-medium text-slate-900 tracking-tight">
              Zeerostock SMS
            </span>
          </Link>
          <div className="w-px h-[18px] bg-gray-200" />
          <span className="text-[12.5px] text-slate-400 tracking-wide">
            Student Management System
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[12px] text-slate-500 bg-slate-50 border border-slate-100 px-3 py-[5px] rounded-full">
          <span className="w-[7px] h-[7px] rounded-full bg-green-500 shrink-0" />
          Live
        </div>

      </div>
    </nav>
  )
}