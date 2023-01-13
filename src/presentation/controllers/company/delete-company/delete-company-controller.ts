import { DeleteCompany } from '@/domain/usecases/company/delete-company'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class DeleteCompanyController implements Controller {
  constructor(private readonly deleteCompany: DeleteCompany) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { companyId: id } = httpRequest.params
    await this.deleteCompany.delete(id)
    return null
  }
}
