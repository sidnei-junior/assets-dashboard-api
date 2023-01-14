import { AddUnit } from '@/domain/usecases/unit/add-unit'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../account/login/login-controller-protocols'
import { badRequest, notFound, NotFoundError, ok, serverError } from '../../account/signup/signup-controller-protocols'

export class AddUnitController implements Controller {
  constructor(private readonly addUnit: AddUnit, private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const unit = await this.addUnit.add(httpRequest.body)

      if (unit === null) {
        return notFound(new NotFoundError('company'))
      }

      return ok(unit)
    } catch (error) {
      return serverError(error)
    }
  }
}
