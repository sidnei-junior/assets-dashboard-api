import { LoadAssetsByCompany } from '@/domain/usecases/asset/load-assets-by-company'
import { Controller, HttpRequest, HttpResponse } from '../../account/login/login-controller-protocols'
import { noContent, ok, serverError } from '../../account/signup/signup-controller-protocols'

export class LoadAssetsByCompanyController implements Controller {
  constructor(private readonly loadAssetsByCompany: LoadAssetsByCompany) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const assets = await this.loadAssetsByCompany.load(httpRequest.params.companyId)
      return assets.length ? ok(assets) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
