import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbUpdateAsset } from '@/main/factories/usecases/asset/update-asset/db-update-asset-factory'
import { UpdateAssetController } from '@/presentation/controllers/asset/update-asset/update-asset-controller'
import { Controller } from '@/presentation/protocols'
import { makeUpdateAssetValidation } from './update-asset-validation-factory'

export const makeUpdateAssetController = (): Controller => {
  const controller = new UpdateAssetController(makeDbUpdateAsset(), makeUpdateAssetValidation())
  return makeLogControllerDecorator(controller)
}
