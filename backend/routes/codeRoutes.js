const express = require('express')
const router = express.Router();
const { getCode, setCode, updateCode, deleteCode } = require('../controllers/codeController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getCode).post(protect, setCode)
router.route('/:id').delete(protect, deleteCode).put(protect, updateCode)

module.exports = router