import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbAddAsset } from '@/main/factories/usecases/asset/add-asset/db-add-asset-factory'
import { AddAssetController } from '@/presentation/controllers/asset/add-asset/add-asset-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddAssetValidation } from './add-asset-validation-factory'

export const makeAddAssetController = (): Controller => {
  const controller = new AddAssetController(makeDbAddAsset(), makeAddAssetValidation())
  return makeLogControllerDecorator(controller)
}
