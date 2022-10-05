import axios from 'axios'

const API_URL = '/api/code/'

// Create new code
const createCode = async (codeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, codeData, config)

    return response.data
}

// Get user code
const getCode = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteCode = async (codeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + codeId, config)

    return response.data
}

const codeService = {
    createCode,
    getCode,
    deleteCode,
}

export default codeService