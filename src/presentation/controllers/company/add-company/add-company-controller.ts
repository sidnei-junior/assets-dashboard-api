import { AddCompany } from '@/domain/usecases/company/add-company'
import { CnpjInUseError } from '@/presentation/errors/cnpj-in-use-error'
import { Controller, HttpRequest, HttpResponse } from '../../account/login/login-controller-protocols'
import { forbidden, ServerError, serverError } from '../../account/signup/signup-controller-protocols'

export class AddCompanyController implements Controller {
  constructor(private readonly addCompany: AddCompany) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, cnpj } = httpRequest.body
      const company = await this.addCompany.add({ name, cnpj })

      if (!company) {
        return forbidden(new CnpjInUseError())
      }

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
