import { UpdateCompany } from '@/domain/usecases/company/update-company'
import { serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class UpdateCompanyController implements Controller {
  constructor(private readonly updateCompany: UpdateCompany) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { companyId: id } = httpRequest.params
      await this.updateCompany.update(httpRequest.body, id)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
