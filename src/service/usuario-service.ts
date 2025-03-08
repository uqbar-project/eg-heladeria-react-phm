import { httpRequest } from "./common"
import { BACKEND_URL, TOKEN_KEY } from "./constants"

export type CredencialesDTO = {
  usuario: string,
  password: string,
}

export async function loginUser(usuario: string, password: string) {
  const token = await httpRequest<string>({
    method: 'POST',
    url: `${BACKEND_URL}/login`, 
    data: { usuario, password }
  })
  localStorage.setItem(TOKEN_KEY, token)
}
