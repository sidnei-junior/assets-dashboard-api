import { DeleteAsset } from '@/domain/usecases/asset/delete-asset'
import { Controller, HttpRequest, HttpResponse } from '../../account/login/login-controller-protocols'
import { noContent, notFound, serverError } from '../../account/signup/signup-controller-protocols'

export class DeleteAssetController implements Controller {
  constructor(private readonly deleteAsset: DeleteAsset) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { assetId: id } = httpRequest.params
      const response = await this.deleteAsset.delete(id)
      return response === null ? notFound() : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
