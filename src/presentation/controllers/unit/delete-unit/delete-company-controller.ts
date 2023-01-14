import { DeleteUnit } from '@/domain/usecases/unit/delete-unit'
import { Controller, HttpRequest, HttpResponse } from '../../account/login/login-controller-protocols'
import { noContent, notFound, serverError } from '../../account/signup/signup-controller-protocols'

export class DeleteUnitController implements Controller {
  constructor(private readonly deleteUnit: DeleteUnit) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { unitId: id } = httpRequest.params
      const response = await this.deleteUnit.delete(id)
      return response === null ? notFound() : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
