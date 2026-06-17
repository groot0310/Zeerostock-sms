const prisma = require('../lib/prisma')

// Create student
const createStudent = async (req, res, next) => {
  try {
    const { name, email, phone, dateOfBirth, address } = req.body

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      })
    }

    const existing = await prisma.student.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      })
    }

    const student = await prisma.student.create({
      data: {
        name,
        email,
        phone: phone || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        address: address || null,
      }
    })

    res.status(201).json({ success: true, data: student })
  } catch (err) {
    next(err)
  }
}

// Get all students with pagination
const getAllStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { marks: true }
      }),
      prisma.student.count()
    ])

    res.json({
      success: true,
      data: students,
      meta: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      }
    })
  } catch (err) {
    next(err)
  }
}

// Get single student by ID
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params

    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      include: { marks: true }
    })

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      })
    }

    res.json({ success: true, data: student })
  } catch (err) {
    next(err)
  }
}

// Update student
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, email, phone, dateOfBirth, address } = req.body

    const existing = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      })
    }

    const student = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        name: name || existing.name,
        email: email || existing.email,
        phone: phone !== undefined ? phone : existing.phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : existing.dateOfBirth,
        address: address !== undefined ? address : existing.address,
      }
    })

    res.json({ success: true, data: student })
  } catch (err) {
    next(err)
  }
}

// Delete student
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params

    const existing = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      })
    }

    await prisma.student.delete({ where: { id: parseInt(id) } })

    res.json({ success: true, message: 'Student deleted successfully' })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
}