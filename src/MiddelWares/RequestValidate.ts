import { NextFunction, Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

const extractErrorsRecursively = ( error: ValidationError, rawErrors: string[] ) => {
    if (error.constraints) {
        Object.values(error.constraints).forEach((errMsg: string) => {
            rawErrors.push(errMsg)
        })
    }
    if (error.children) {
        error.children.forEach((childError) => {
            extractErrorsRecursively(childError, rawErrors)
        })
    }
}
const requestValidate = (requestType: any) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const converterObject = plainToInstance(requestType, request.body)
        const valid = await validate(converterObject)
        if (valid.length > 0) {
            const rawErrors: string[] = []
            valid.forEach((validationError) => { extractErrorsRecursively(validationError, rawErrors) })
            const data = {code: 400, data: rawErrors}
            response.status(400).json(data)
        } else {
            next()
        }
    }
}

export default requestValidate
