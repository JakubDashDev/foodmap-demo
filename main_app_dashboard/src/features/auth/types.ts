export interface IAdminUser {
  uuid: string
  email: string
}

export interface ILoginPayload {
  email: string
  password: string
}

export interface IAuthResponse {
  message: string
  admin_user: IAdminUser
}
