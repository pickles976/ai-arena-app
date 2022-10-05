const asyncHandler = require('express-async-handler')
const { restart } = require('nodemon')

const Code = require('../models/codeModel')

// @desc Get code
// @route GET /api/code
// @access private
const getCode = asyncHandler(async (req, res) => {
    const code = await Code.find({ user: req.user.id })
    res.status(200).json(code)
})

// @desc Set code
// @route SET /api/code
// @access private
const setCode = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const code = await Code.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json({message : code})
})

// @desc Get code
// @route PUT /api/code
// @access private
const updateCode = asyncHandler(async (req, res) => {

    const code = await Code.findById(req.params.id)

    if(!code){
        res.status(400)
        throw new Error('code not found')
    }

    if (!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if (code.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedcode = await Code.findByIdAndUpdate(req.params.id,req.body,{new: true})

    res.status(200).json(updatedcode)
})

// @desc Get code
// @route DELETE /api/code
// @access private
const deleteCode = asyncHandler(async (req, res) => {
    const code = await Code.findById(req.params.id)

    if (!code){
        res.status(400)
        throw new Error('code not found')
    }

    if (!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if (code.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Code.remove()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getCode,
    setCode,
    updateCode,
    deleteCode,
}