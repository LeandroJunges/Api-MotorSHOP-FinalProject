import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { IUserRequest } from "../../interfaces/users";
import { AppError } from "../../errors/appError";
import { hash } from "bcrypt";
import { Address } from "../../entities/Address.entity";

const createUserService = async ({
  name,
  email,
  cpf,
  cellphone,
  password,
  description,
  dateOfBirth,
  isAdvertiser,
  cep,
  state,
  city,
  street,
  number,
  complement,
}: IUserRequest) => {
  const usersRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  if (
    !(
      name &&
      email &&
      password &&
      cpf &&
      description &&
      dateOfBirth &&
      isAdvertiser &&
      cep &&
      state &&
      city &&
      cellphone &&
      street &&
      number
    )
  ) {
    throw new AppError(400, "All required field must be filled");
  }

  const emailAlreadyExists = await usersRepository.findOne({
    where: { email: email },
  });

  if (emailAlreadyExists)
    throw new AppError(400, "Em-mail is already being used");

  const user = new User();
  const address = new Address();

  user.name = name;
  user.email = email;
  user.cpf = cpf;
  user.cellphone = cellphone;
  user.password = await hash(password, 10);
  user.description = description;
  user.dateOfBirth = dateOfBirth;
  user.isAdvertiser = isAdvertiser;

  address.cep = cep;
  address.state = state;
  address.city = city;
  address.street = street;
  address.number = number;
  complement ? (address.complement = complement) : null;

  user.address = address;

  await addressRepository.save(address);
  const newUser: User = await usersRepository.save(user);

  return newUser;
};

export default createUserService;
