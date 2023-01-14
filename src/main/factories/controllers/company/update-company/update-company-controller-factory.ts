import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbUpdateCompany } from '@/main/factories/usecases/company/update-company/db-update-company-factory'
import { UpdateCompanyController } from '@/presentation/controllers/company/update-company/update-company-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddCompanyValidation } from '../add-company/add-company-validation-factory'

export const makeUpdateCompanyController = (): Controller => {
  const controller = new UpdateCompanyController(makeDbUpdateCompany(), makeAddCompanyValidation())
  return makeLogControllerDecorator(controller)
}
