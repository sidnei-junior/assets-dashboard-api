import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbUpdateUnit } from '@/main/factories/usecases/unit/update-unit/db-update-unit-factory'
import { UpdateUnitController } from '@/presentation/controllers/unit/update-unit/update-unit-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddUnitValidation } from '../add-unit/add-unit-validation-factory'

export const makeUpdateUnitController = (): Controller => {
  const controller = new UpdateUnitController(makeDbUpdateUnit(), makeAddUnitValidation())
  return makeLogControllerDecorator(controller)
}
