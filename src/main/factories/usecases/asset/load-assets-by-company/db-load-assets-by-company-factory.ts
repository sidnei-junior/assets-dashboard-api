import { DbLoadAssetsByCompany } from '@/data/usecases/asset/load-assets-by-company/db-load-assets-by-company'
import { LoadAssetsByCompany } from '@/domain/usecases/asset/load-assets-by-company'
import { AssetMongoRepository } from '@/infra/db/mongodb/asset/asset-mongo-repository'

export const makeDbLoadAssetsByCompany = (): LoadAssetsByCompany => {
  const assetMongoRepository = new AssetMongoRepository()
  return new DbLoadAssetsByCompany(assetMongoRepository)
}
