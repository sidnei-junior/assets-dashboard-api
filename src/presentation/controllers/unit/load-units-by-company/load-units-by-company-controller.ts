import { LoadUnitsByCompany } from '@/domain/usecases/unit/load-units-by-company'
import { Controller, HttpRequest, HttpResponse } from '../../account/login/login-controller-protocols'
import { noContent, notFound, NotFoundError, ok, serverError } from '../../account/signup/signup-controller-protocols'

export class LoadUnitsByCompanyController implements Controller {
  constructor(private readonly loadUnitsByCompany: LoadUnitsByCompany) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const units = await this.loadUnitsByCompany.load(httpRequest.body.companyId)
      return units.length ? ok(units) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
