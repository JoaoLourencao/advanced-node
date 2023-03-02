// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AccessToken } from '@/domain/models'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthenticationError } from '@/domain/errors'

export interface FacebookAuthentication {
  exec: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
