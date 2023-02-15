import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/User.entity";


const verifyIsAdvertiserMiddleware = async( request: Request, response: Response, next : NextFunction):Promise<Response| void> => {
    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({id: request.user.id});

    if(!findUser) {
        return response.status(400).json({message: "User does not exist"}) 
    }
    if(!findUser.isAdvertiser) {
        return response.status(403).json({message: "User has no authorization"})
    }
    return next()
}

export default verifyIsAdvertiserMiddleware