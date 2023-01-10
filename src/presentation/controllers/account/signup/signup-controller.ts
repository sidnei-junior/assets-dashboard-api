import {
  AddAccount,
  badRequest,
  Controller,
  EmailInUseError,
  forbidden,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  Validation
} from './signup-controller-protocols'

export class SignupController implements Controller {
  constructor(private readonly addAccount: AddAccount, private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { name, password, email } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
