import { AddUnit } from '@/domain/usecases/unit/add-unit'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../account/login/login-controller-protocols'
import { notFound, NotFoundError, ok, serverError } from '../../account/signup/signup-controller-protocols'

export class AddUnitController implements Controller {
  constructor(private readonly addUnit: AddUnit, private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.validation.validate(httpRequest.body)

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
