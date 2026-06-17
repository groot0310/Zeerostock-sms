import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import StudentList from './pages/StudentList'
import StudentDetail from './pages/StudentDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}