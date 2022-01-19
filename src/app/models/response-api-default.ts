import { UserApiType } from "./ClientType";

export type ReponseWrapper<T> =  T & {
    data: {
        message: string
        status: number
    }
    notification: any
}