import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-company-by-id-repository'
import { AddAssetRepository } from '@/data/protocols/db/asset/add-asset-repository'
import { LoadUnitByIdRepository } from '@/data/protocols/db/unit/load-unit-by-id-repository'
import { AssetModel } from '@/domain/models/asset'
import { AddAsset, AddAssetModel } from '@/domain/usecases/asset/add-asset'

export class DbAddAsset implements AddAsset {
  constructor(
    private readonly addAssetRepository: AddAssetRepository,
    private readonly loadUnitByIdRepository: LoadUnitByIdRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async add(assetData: AddAssetModel): Promise<AssetModel | string> {
    const responseLoadUnit = await this.loadUnitByIdRepository.loadById(assetData.unitId)

    if (responseLoadUnit === null) {
      return 'unit'
    }

    const responseLoadAccount = await this.loadAccountByIdRepository.loadById(assetData.ownerId)

    if (responseLoadAccount === null) {
      return 'owner'
    }

    const asset = await this.addAssetRepository.add({ ...assetData, companyId: responseLoadUnit.companyId })
    return asset
  }
}
