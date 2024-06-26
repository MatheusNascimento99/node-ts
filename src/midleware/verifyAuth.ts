import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuth (request: Request, response: Response, next: NextFunction){
    const  authToken = request.headers.autorizathion

    if(authToken){
        const [, token] = authToken.split(' ')

        try{
            const { sub } = verify(token, '123456789')
            console.log('Token for user', sub)
            return next();
        }catch(error) {
            return response.status(401).json({message: 'Unauthoraized'})
        }
    }
    return response.status(401).json({message: 'Unauthoraized'})

}