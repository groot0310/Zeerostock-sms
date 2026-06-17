const express = require('express')
const router = express.Router()
const { addMark, updateMark, deleteMark } = require('../controllers/marksController')

router.post('/', addMark)
router.put('/:id', updateMark)
router.delete('/:id', deleteMark)

module.exports = router