import { UpdateAsset } from '@/domain/usecases/asset/update-asset'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../account/login/login-controller-protocols'
import { badRequest, notFound, NotFoundError, ok, serverError } from '../../account/signup/signup-controller-protocols'

export class UpdateAssetController implements Controller {
  constructor(private readonly updateAsset: UpdateAsset, private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }
      const { assetId: id } = httpRequest.params
      const asset = await this.updateAsset.update(httpRequest.body, id)
      if (typeof asset === 'string') {
        return notFound(new NotFoundError(asset))
      }
      return ok(asset)
    } catch (error) {
      return serverError(error)
    }
  }
}
