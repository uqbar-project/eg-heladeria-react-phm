import { customRequest } from "./common"

export type CredencialesDTO = {
  usuario: string,
  password: string,
}

export async function loginUser(usuario: string, password: string): Promise<string> {
  return customRequest<string>('/login', { usuario, password } as unknown as string)
}
