import { LoadCompanies } from '@/domain/usecases/company/load-companies'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadCompaniesController implements Controller {
  constructor(private readonly loadCompanies: LoadCompanies) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.loadCompanies.load()
    return null
  }
}
