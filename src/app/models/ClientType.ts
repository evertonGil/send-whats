import { AddressType } from "./AddressType"

export interface ClientType {
  id: string
  name: string
  lastName: string
  docNumber: string
  docType: number
  email: string
  address: AddressType
  phone: string
  idUser: string
  user: UserType
  status: number
}

export interface UserType {
  id?: string
  login: string
  password: string
  role: string
  token?: string
}

