import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbLoadAssetsByCompany } from '@/main/factories/usecases/asset/load-assets-by-company/db-load-assets-by-company-factory'
import { LoadAssetsByCompanyController } from '@/presentation/controllers/asset/load-assets-by-company/load-assets-by-company-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadAssetsByCompanyController = (): Controller => {
  const controller = new LoadAssetsByCompanyController(makeDbLoadAssetsByCompany())
  return makeLogControllerDecorator(controller)
}
