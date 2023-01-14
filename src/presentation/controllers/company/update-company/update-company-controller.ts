import { UpdateCompany } from '@/domain/usecases/company/update-company'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class UpdateCompanyController implements Controller {
  constructor(private readonly updateCompany: UpdateCompany) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { companyId: id } = httpRequest.params
    await this.updateCompany.update(httpRequest.body, id)
    return null
  }
}
