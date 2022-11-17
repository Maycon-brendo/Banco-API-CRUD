import { NextFunction, Request, Response } from "express"
import { getMongoManager, MongoEntityManager } from "typeorm"
import { verify } from 'jsonwebtoken'

import { Usuario, STATUS } from "../entity/Usuario"
import { SECRET } from "../config/secret"

export class AuthController {

    static verifyToken(req: Request, res: Response, next: NextFunction) {
        let token = req.headers['authorization']
        if (token) {
            token = token.substring(7, token.length)

            try {
                verify(token, SECRET)
                next()
            } catch (error) {

            }
        }

        res.status(401).json({ message: STATUS.NOT_AUTHORIZED })
    }
}