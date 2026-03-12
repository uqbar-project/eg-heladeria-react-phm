import { httpRequest } from "./common"
import { BACKEND_URL } from "./constants"
import { setTokens } from "./token-service"

export type CredencialesDTO = {
  usuario: string,
  password: string,
}

export type LoginResponse = {
  accessToken: string,
  refreshToken: string,
}

export async function loginUser(usuario: string, password: string): Promise<void> {
  const response = await httpRequest<LoginResponse>({
    method: 'POST',
    url: `${BACKEND_URL}/login`, 
    data: { usuario, password }
  })
  const { accessToken, refreshToken } = response
  setTokens(accessToken, refreshToken)
}
