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
  img,
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
      cep &&
      state &&
      city &&
      cellphone &&
      street &&
      number &&
      img
    )
  ) {
    throw new AppError(400, "All required fields must be filled");
  }

  const emailAlreadyExists = await usersRepository.findOne({
    where: { email: email },
  });

  const cpfAlreadyExists = await usersRepository.findOne({
    where: { cpf: cpf },
  });

  const cellphoneAlreadyExists = await usersRepository.findOne({
    where: { cellphone: cellphone },
  });

  if (emailAlreadyExists) {
    throw new AppError(400, "E-mail is already being used");
  } else if (cpfAlreadyExists) {
    throw new AppError(400, "Cpf is already being used");
  } else if (cellphoneAlreadyExists) {
    throw new AppError(400, "Cellphone is already being used");
  }

  const user = new User();
  const address = new Address();

  user.name = name;
  user.email = email;
  user.cpf = cpf;
  user.cellphone = cellphone;
  user.password = await hash(password, 10);
  user.description = description;
  user.dateOfBirth = dateOfBirth;
  if (img) {
    user.img = img;
  }
  user.isActive = true;

  isAdvertiser
    ? (user.isAdvertiser = isAdvertiser)
    : (user.isAdvertiser = false);

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
