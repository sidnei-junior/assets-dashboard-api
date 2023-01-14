import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbLoadUnitsByCompany } from '@/main/factories/usecases/unit/load-units-by-company/db-load-units-by-company-factory'
import { LoadUnitsByCompanyController } from '@/presentation/controllers/unit/load-units-by-company/load-units-by-company-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadUnitsByCompanyController = (): Controller => {
  const controller = new LoadUnitsByCompanyController(makeDbLoadUnitsByCompany())
  return makeLogControllerDecorator(controller)
}
