import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbLoadAssetsByUnit } from '@/main/factories/usecases/asset/load-assets-by-unit/db-load-assets-by-unit-factory'
import { LoadAssetsByUnitController } from '@/presentation/controllers/asset/load-assets-by-unit/load-assets-by-unit-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadAssetsByUnitController = (): Controller => {
  const controller = new LoadAssetsByUnitController(makeDbLoadAssetsByUnit())
  return makeLogControllerDecorator(controller)
}
