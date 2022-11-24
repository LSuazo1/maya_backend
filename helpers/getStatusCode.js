const statusCodes = {
    400: {
        code: 400,
        message: 'Bad Request'
    },
    401: {
        status: 401,
        message: "Unauthorized"
    },
    403: {
        status: 403,
        message: "You are not allowed to access this resource"
    },
    404: {
        status: 404,
        message: "Not found"
    },
    500: {
        code: 500,
        message: 'Internal Server Error',
    }
}


const statusResponse = (code, message) => {
    status = statusCodes[code]

    return {
        error: {
            status: status.code,
            message: message || status.message
        }
    }
}


module.exports = { statusResponse, statusCodes }
