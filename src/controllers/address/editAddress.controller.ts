import { instanceToPlain } from 'class-transformer';
import {Request, Response}from "express"
import editAddressService from "../../services/address/editAddress.services"


const editAddressController = async (req: Request, res:Response )=>{

    const address = req.body
    const userId = req.user.id

    
    const updatedAddress = await editAddressService(address, userId)

    return res.json(instanceToPlain(updatedAddress))


}

export default editAddressController