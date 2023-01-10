import { AddAccount, Controller, HttpRequest, HttpResponse } from './signup-controller-protocols'

export class SignupController implements Controller {
  constructor(private readonly addAccount: AddAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, password, email } = httpRequest.body

    await this.addAccount.add({
      name,
      email,
      password
    })

    return null
  }
}
