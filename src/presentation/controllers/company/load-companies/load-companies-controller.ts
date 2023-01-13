import { LoadCompanies } from '@/domain/usecases/company/load-companies'
import { noContent, ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadCompaniesController implements Controller {
  constructor(private readonly loadCompanies: LoadCompanies) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const companies = await this.loadCompanies.load()
    return companies.length ? ok(companies) : noContent()
  }
}
