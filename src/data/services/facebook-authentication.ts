import { type LoadFacebookUserApi } from '@/data/contracts/apis'
import { type CreateFacebookAccountRepository, type LoadUserAccountRepository, type UpdateFacebookAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { type FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository
  ) { }

  async exec(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)

    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      if (accountData?.name !== undefined) {
        await this.userAccountRepo.updateWithFacebook({
          id: accountData.id,
          name: accountData.name,
          facebookId: fbData.facebookId
        })
      } else { await this.userAccountRepo.createFromFacebook(fbData) }
    }

    return new AuthenticationError()
  }
}
