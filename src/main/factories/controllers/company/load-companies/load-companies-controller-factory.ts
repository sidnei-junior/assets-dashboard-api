import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbLoadCompanies } from '@/main/factories/usecases/company/load-companies/db-load-companies-factory'
import { LoadCompaniesController } from '@/presentation/controllers/company/load-companies/load-companies-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadCompaniesController = (): Controller => {
  const controller = new LoadCompaniesController(makeDbLoadCompanies())
  return makeLogControllerDecorator(controller)
}
