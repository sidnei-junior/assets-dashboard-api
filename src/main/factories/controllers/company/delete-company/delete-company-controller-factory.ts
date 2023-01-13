import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbDeleteCompany } from '@/main/factories/usecases/company/delete-company/db-delete-company-factory'
import { DeleteCompanyController } from '@/presentation/controllers/company/delete-company/delete-company-controller'
import { Controller } from '@/presentation/protocols'

export const makeDeleteCompanyController = (): Controller => {
  const controller = new DeleteCompanyController(makeDbDeleteCompany())
  return makeLogControllerDecorator(controller)
}
