import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-company-by-id-repository'
import { UpdateAssetRepository } from '@/data/protocols/db/asset/update-asset-repository'
import { LoadUnitByIdRepository } from '@/data/protocols/db/unit/load-unit-by-id-repository'
import { AssetModel } from '@/domain/models/asset'
import { UpdateAsset, UpdateAssetModel } from '@/domain/usecases/asset/update-asset'

export class DbUpdateAsset implements UpdateAsset {
  constructor(
    private readonly updateAssetRepository: UpdateAssetRepository,
    private readonly loadUnitByIdRepository: LoadUnitByIdRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async update(assetData: UpdateAssetModel, id: string): Promise<AssetModel | string> {
    const responseUnit = await this.loadUnitByIdRepository.loadById(assetData.unitId)

    if (responseUnit === null) {
      return 'unit'
    }

    const responseAccount = await this.loadAccountByIdRepository.loadById(assetData.ownerId)

    if (responseAccount === null) {
      return 'owner'
    }

    const asset = await this.updateAssetRepository.update({ ...assetData, companyId: responseUnit.companyId }, id)
    return asset
  }
}
