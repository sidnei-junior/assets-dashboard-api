import { DbLoadAssetsByUnit } from '@/data/usecases/asset/load-assets-by-unit/db-load-assets-by-unit'
import { LoadAssetsByUnit } from '@/domain/usecases/asset/load-assets-by-unit'
import { AssetMongoRepository } from '@/infra/db/mongodb/asset/asset-mongo-repository'

export const makeDbLoadAssetsByUnit = (): LoadAssetsByUnit => {
  const assetMongoRepository = new AssetMongoRepository()
  return new DbLoadAssetsByUnit(assetMongoRepository)
}
