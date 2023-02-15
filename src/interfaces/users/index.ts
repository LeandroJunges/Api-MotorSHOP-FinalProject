export interface IUserRequest {
  name: string;
  email: string;
  cpf: string;
  cellphone: string;
  password: string;
  description: string;
  dateOfBirth: Date;
  isAdvertiser: boolean;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  img: string;
  complement?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  cpf?: string;
  cellphone?: string;
  description?: string;
  dateOfBirth?: Date;
  isAdvertiser?: boolean;
}

export interface IUserDelete {
  isActive: boolean;
}
