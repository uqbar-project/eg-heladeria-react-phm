import { httpRequest } from "./common"
import { BACKEND_URL } from "./constants"

export type CredencialesDTO = {
  usuario: string,
  password: string,
}

export async function loginUser(usuario: string, password: string): Promise<string> {
  return httpRequest<string>({
    method: 'POST',
    url: `${BACKEND_URL}/login`, 
    data: { usuario, password }
  })
}
