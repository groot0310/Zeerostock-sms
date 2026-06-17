const express = require('express')
const cors = require('cors')
require('dotenv').config()

const studentRoutes = require('./routes/studentRoutes')
const marksRoutes = require('./routes/marksRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/students', studentRoutes)
app.use('/api/marks', marksRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})