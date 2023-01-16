import { LoadAssetsByUnit } from '@/domain/usecases/asset/load-assets-by-unit'
import { Controller, HttpRequest, HttpResponse } from '../../account/login/login-controller-protocols'
import { noContent, ok, serverError } from '../../account/signup/signup-controller-protocols'

export class LoadAssetsByUnitController implements Controller {
  constructor(private readonly loadAssetsByUnit: LoadAssetsByUnit) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const assets = await this.loadAssetsByUnit.load(httpRequest.params.unitId)
      return assets.length ? ok(assets) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
