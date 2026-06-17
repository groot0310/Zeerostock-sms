const prisma = require('../lib/prisma')

// Add mark
const addMark = async (req, res, next) => {
  try {
    const { studentId, subject, score, grade } = req.body

    if (!studentId || !subject || score === undefined) {
      return res.status(400).json({
        success: false,
        message: 'studentId, subject and score are required'
      })
    }

    const student = await prisma.student.findUnique({
      where: { id: parseInt(studentId) }
    })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      })
    }

    const mark = await prisma.mark.create({
      data: {
        studentId: parseInt(studentId),
        subject,
        score: parseFloat(score),
        grade: grade || null,
      }
    })

    res.status(201).json({ success: true, data: mark })
  } catch (err) {
    next(err)
  }
}

// Update mark
const updateMark = async (req, res, next) => {
  try {
    const { id } = req.params
    const { subject, score, grade } = req.body

    const existing = await prisma.mark.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Mark not found'
      })
    }

    const mark = await prisma.mark.update({
      where: { id: parseInt(id) },
      data: {
        subject: subject || existing.subject,
        score: score !== undefined ? parseFloat(score) : existing.score,
        grade: grade !== undefined ? grade : existing.grade,
      }
    })

    res.json({ success: true, data: mark })
  } catch (err) {
    next(err)
  }
}

// Delete mark
const deleteMark = async (req, res, next) => {
  try {
    const { id } = req.params

    const existing = await prisma.mark.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Mark not found'
      })
    }

    await prisma.mark.delete({ where: { id: parseInt(id) } })

    res.json({ success: true, message: 'Mark deleted successfully' })
  } catch (err) {
    next(err)
  }
}

module.exports = { addMark, updateMark, deleteMark }