import { NextFunction, Response } from 'express'
import { AppDataSource } from '../dbConfig/data-source'
const jwt = require('jsonwebtoken')

const jwtSecret = 'your-secret-key'

const verifyToken = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try{
            if (req.headers && req.headers.authorization) {
                const authorization = req.headers.authorization.split(' ')[1]
                if (!authorization) { return res.status(403).json('A token is required for authentication') }
                    const data = jwt.verify(authorization, jwtSecret)
                    if (!data) return res.status(403).json({ error: 'Invalid token.' })
                    const userRepository = AppDataSource.getRepository("user");
                    const user = await userRepository.findOne({where:{ id: data.userId }});
                    req.user = user
                    next()
            } else {
                return res.status(403).send('A token is required for authentication')
            }       
    } catch (err) {
        return res.status(401).send('Invalid Token').json
    }
}

export default verifyToken
