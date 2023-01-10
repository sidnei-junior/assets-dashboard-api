import {
  AddAccount,
  Controller,
  EmailInUseError,
  forbidden,
  HttpRequest,
  HttpResponse,
  serverError
} from './signup-controller-protocols'

export class SignupController implements Controller {
  constructor(private readonly addAccount: AddAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, password, email } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
