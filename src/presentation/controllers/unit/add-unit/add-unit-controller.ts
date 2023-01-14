import { AddUnit } from '@/domain/usecases/unit/add-unit'
import { Controller, HttpRequest, HttpResponse } from '../../account/login/login-controller-protocols'

export class AddUnitController implements Controller {
  constructor(private readonly addUnit: AddUnit) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addUnit.add(httpRequest.body)
    return null
  }
}
