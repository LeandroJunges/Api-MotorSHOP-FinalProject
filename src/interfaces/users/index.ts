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
  complement?: string;
}
