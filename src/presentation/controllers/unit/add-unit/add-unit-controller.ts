import { AddUnit } from '@/domain/usecases/unit/add-unit'
import { Controller, HttpRequest, HttpResponse } from '../../account/login/login-controller-protocols'
import { notFound, NotFoundError, serverError } from '../../account/signup/signup-controller-protocols'

export class AddUnitController implements Controller {
  constructor(private readonly addUnit: AddUnit) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const unit = await this.addUnit.add(httpRequest.body)
      if (unit === null) {
        return notFound(new NotFoundError('company'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
