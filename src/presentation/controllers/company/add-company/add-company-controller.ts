import { AddCompany } from '@/domain/usecases/company/add-company'
import { Controller, HttpRequest, HttpResponse } from '../../account/login/login-controller-protocols'
import { ServerError, serverError } from '../../account/signup/signup-controller-protocols'

export class AddCompanyController implements Controller {
  constructor(private readonly addCompany: AddCompany) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, cnpj } = httpRequest.body
      await this.addCompany.add({ name, cnpj })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
