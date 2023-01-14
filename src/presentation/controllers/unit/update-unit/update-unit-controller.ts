import { UpdateUnit } from '@/domain/usecases/unit/update-unit'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../account/login/login-controller-protocols'
import { badRequest, notFound, NotFoundError, ok, serverError } from '../../account/signup/signup-controller-protocols'

export class UpdateUnitController implements Controller {
  constructor(private readonly updateUnit: UpdateUnit, private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }
      const { unitId: id } = httpRequest.params
      const unit = await this.updateUnit.update(httpRequest.body, id)
      if (typeof unit === 'string') {
        return notFound(new NotFoundError(unit))
      }
      return ok(unit)
    } catch (error) {
      return serverError(error)
    }
  }
}
