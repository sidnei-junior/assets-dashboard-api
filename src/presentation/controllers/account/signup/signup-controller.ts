import { AddAccount, Controller, HttpRequest, HttpResponse, serverError } from './signup-controller-protocols'

export class SignupController implements Controller {
  constructor(private readonly addAccount: AddAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, password, email } = httpRequest.body

      await this.addAccount.add({
        name,
        email,
        password
      })

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
