import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbDeleteUnit } from '@/main/factories/usecases/unit/delete-unit/db-unit-company-factory'
import { DeleteUnitController } from '@/presentation/controllers/unit/delete-unit/delete-unit-controller'
import { Controller } from '@/presentation/protocols'

export const makeDeleteUnitController = (): Controller => {
  const controller = new DeleteUnitController(makeDbDeleteUnit())
  return makeLogControllerDecorator(controller)
}
