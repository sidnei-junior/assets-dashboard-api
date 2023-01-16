import { DbUpdateAsset } from '@/data/usecases/asset/update-asset/db-update-asset'
import { UpdateAsset } from '@/domain/usecases/asset/update-asset'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { AssetMongoRepository } from '@/infra/db/mongodb/asset/asset-mongo-repository'
import { UnitMongoRepository } from '@/infra/db/mongodb/unit/unit-mongo-repository'

export const makeDbUpdateAsset = (): UpdateAsset => {
  const assetMongoRepository = new AssetMongoRepository()
  const unitMongoRepository = new UnitMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  return new DbUpdateAsset(assetMongoRepository, unitMongoRepository, accountMongoRepository)
}
