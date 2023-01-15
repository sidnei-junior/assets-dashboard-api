import { DbAddAsset } from '@/data/usecases/asset/add-asset/db-add-asset'
import { AddAsset } from '@/domain/usecases/asset/add-asset'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { AssetMongoRepository } from '@/infra/db/mongodb/asset/asset-mongo-repository'
import { UnitMongoRepository } from '@/infra/db/mongodb/unit/unit-mongo-repository'

export const makeDbAddAsset = (): AddAsset => {
  const assetMongoRepository = new AssetMongoRepository()
  const unitMongoRepository = new UnitMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAsset(assetMongoRepository, unitMongoRepository, accountMongoRepository)
}
