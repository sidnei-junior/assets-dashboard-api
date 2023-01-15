import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbAddUnit } from '@/main/factories/usecases/unit/add-unit/db-add-unit-factory'
import { AddUnitController } from '@/presentation/controllers/unit/add-unit/add-unit-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddUnitValidation } from './add-unit-validation-factory'

export const makeAddUnitController = (): Controller => {
  const controller = new AddUnitController(makeDbAddUnit(), makeAddUnitValidation())
  return makeLogControllerDecorator(controller)
}
