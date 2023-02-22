import {
  IUserLoginRequest,
  IUserRequest,
  IUserUpdate,
  IUserWrongRequest,
  IUserWrongUpdate,
} from "../../interfaces/users";

export const advertiserUser: IUserRequest = {
  name: "Gustavo",
  email: "gustavocs81@gmail.com",
  password: "1234",
  cpf: "42715359829",
  cellphone: "11972750808",
  description: "Um cara legal",
  dateOfBirth: new Date("2000/05/22"),
  isAdvertiser: true,
  cep: "12600230",
  state: "São Paulo",
  city: "Lorena",
  street: "Barão da Bocaina",
  number: "196",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Boracay_White_Beach.png/1024px-Boracay_White_Beach.png",
};

export const userWrongCreate: IUserWrongRequest = {
  name: "Gustavo",
  email: "gustavocs81@gmail.com",
  cpf: "42715359829",
  cep: "12600230",
  state: "São Paulo",
  city: "Lorena",
  street: "Barão da Bocaina",
  number: "196",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Boracay_White_Beach.png/1024px-Boracay_White_Beach.png",
};

export const nonAdvertiserUser: IUserRequest = {
  name: "Gustavo",
  email: "gustavocs82@gmail.com",
  password: "1234",
  cpf: "42715359821",
  cellphone: "11972750811",
  description: "Um cara legal",
  dateOfBirth: new Date("2000/05/22"),
  isAdvertiser: false,
  cep: "12600230",
  state: "São Paulo",
  city: "Lorena",
  street: "Barão da Bocaina",
  number: "196",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Boracay_White_Beach.png/1024px-Boracay_White_Beach.png",
};

export const nonAdvertiserUser1: IUserRequest = {
  name: "Gustavo",
  email: "gustavocs83@gmail.com",
  password: "1234",
  cpf: "42715359822",
  cellphone: "11972750821",
  description: "Um cara legal",
  dateOfBirth: new Date("2000/05/22"),
  isAdvertiser: false,
  cep: "12600230",
  state: "São Paulo",
  city: "Lorena",
  street: "Barão da Bocaina",
  number: "196",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Boracay_White_Beach.png/1024px-Boracay_White_Beach.png",
};

export const advertiserUserEdit: IUserUpdate = {
  name: "Gustavinho",
  cpf: "4271532222",
  cellphone: "119727508222",
  description: "Um cara bem legal",
};

export const advertiserUserWrongEdit: IUserWrongUpdate = {
  name: "Gustavinho",
  cpf: "4271532222",
  password: "12345",
  cellphone: "119727508222",
  description: "Um cara bem legal",
  dateOfBirth: new Date("22/05/2001"),
};

export const userAdvertiserLogin: IUserLoginRequest = {
  email: "gustavocs81@gmail.com",
  password: "1234",
};

export const userNonAdvertiserLogin: IUserLoginRequest = {
  email: "gustavo82@gmail.com",
  password: "1234",
};

export const userNonAdvertiserLogin1: IUserLoginRequest = {
  email: "gustavo83@gmail.com",
  password: "1234",
};
