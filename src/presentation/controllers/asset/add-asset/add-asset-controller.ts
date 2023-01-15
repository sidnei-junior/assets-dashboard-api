import { AddAsset } from '@/domain/usecases/asset/add-asset'
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  notFound,
  NotFoundError,
  ok,
  serverError,
  Validation
} from '../../account/signup/signup-controller-protocols'

export class AddAssetController implements Controller {
  constructor(private readonly addAsset: AddAsset, private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const asset = await this.addAsset.add(httpRequest.body)

      if (typeof asset === 'string') {
        return notFound(new NotFoundError(asset))
      }

      return ok(asset)
    } catch (error) {
      return serverError(error)
    }
  }
}
