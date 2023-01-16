import { DbDeleteAsset } from '@/data/usecases/asset/delete-asset/db-delete-asset'
import { DeleteAsset } from '@/domain/usecases/asset/delete-asset'
import { AssetMongoRepository } from '@/infra/db/mongodb/asset/asset-mongo-repository'

export const makeDbDeleteAsset = (): DeleteAsset => {
  const assetMongoRepository = new AssetMongoRepository()
  return new DbDeleteAsset(assetMongoRepository)
}
