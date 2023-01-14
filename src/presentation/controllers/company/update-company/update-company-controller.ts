import { UpdateCompany } from '@/domain/usecases/company/update-company'
import { notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdateCompanyController implements Controller {
  constructor(private readonly updateCompany: UpdateCompany, private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.validation.validate(httpRequest.body)
      const { companyId: id } = httpRequest.params
      const company = await this.updateCompany.update(httpRequest.body, id)
      if (company === null) {
        return notFound()
      }
      return ok(company)
    } catch (error) {
      return serverError(error)
    }
  }
}
