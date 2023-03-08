import { IAddressRequest } from './../../interfaces/users/index';
import {AppDataSource} from "../../data-source"
import { Address } from "../../entities/Address.entity"
import { User } from "../../entities/User.entity"
import { AppError } from '../../errors/appError';

const editAddressService = async ({cep,city,complement,number,state, street}:IAddressRequest, id:string)=>{

    
    const userRepository = AppDataSource.getRepository(User)
    const addressRepository = AppDataSource.getRepository(Address)

    // const findAddress = addressRepository.findOne({
    //     where: {

    // })

    const findUser = await userRepository.findOneBy({
        id
    })

    const addressId = findUser?.address.id

    if(!findUser){
        throw new AppError(404, "User not found!")
    }

    
    

    await addressRepository.update(addressId!,{
        cep: cep? cep : findUser.address.cep,
        city: city? city : findUser.address.city,
        complement: complement? complement : findUser.address.complement,
        number: number? number : findUser.address.number,
        state: state? state : findUser.address.state,
        street : street? street : findUser.address.street
    })
    const user = await userRepository.findOneBy({
        id
    })

    return user

}

export default editAddressService