import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-facotry'
import { makeDbDeleteAsset } from '@/main/factories/usecases/asset/delete-asset/db-delete-asset-factory'
import { DeleteAssetController } from '@/presentation/controllers/asset/delete-asset/delete-asset-controller'
import { Controller } from '@/presentation/protocols'

export const makeDeleteAssetController = (): Controller => {
  const controller = new DeleteAssetController(makeDbDeleteAsset())
  return makeLogControllerDecorator(controller)
}
