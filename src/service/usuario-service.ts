import { httpRequest } from "./common"
import { BACKEND_URL, TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants"

export type CredencialesDTO = {
  usuario: string,
  password: string,
}

export type LoginResponse = {
  accessToken: string,
  refreshToken: string,
}

export async function loginUser(usuario: string, password: string) {
  const response = await httpRequest<LoginResponse>({
    method: 'POST',
    url: `${BACKEND_URL}/login`, 
    data: { usuario, password }
  })
  const { accessToken, refreshToken } = response
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}
