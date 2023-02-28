export interface IUserRequest {
  name: string;
  email: string;
  cpf: string;
  cellphone: string;
  password: string;
  description: string;
  dateOfBirth: Date;
  isAdvertiser?: boolean;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
  img?: string;
}

export interface IUserWrongRequest {
  name: string;
  email: string;
  cpf: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
  img?: string;
}

export interface IUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    cellphone: string;
    description: string;
    dateOfBirth: Date;
    isAdvertiser: boolean;
    isActive: boolean;
    img?: string;
    address: {
      id: string;
      cep: string;
      state: string;
      city: string;
      street: string;
      number: string;
      complement?: string;
    };
  };
  token: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}
export interface IAddressRequest {
  cep: string;
  state: string;
  city: string;
  number: string;
  complement: string;
  street: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  cellphone?: string;
  description?: string;
  dateOfBirth?: Date;
  isAdvertiser?: boolean;
}

export interface IUserWrongUpdate extends IUserUpdate {
  password?: string;
}
