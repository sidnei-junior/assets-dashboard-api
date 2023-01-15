import { LoadAssetsByUnitRepository } from '@/data/protocols/db/asset/load-assets-by-unit-repository'
import { AssetModel } from '@/domain/models/asset'
import { LoadAssetsByUnit } from '@/domain/usecases/asset/load-assets-by-unit'

export class DbLoadAssetsByUnit implements LoadAssetsByUnit {
  constructor(private readonly loadAssetsByUnitRepository: LoadAssetsByUnitRepository) {}
  async load(unitId: string): Promise<AssetModel[]> {
    const companies = await this.loadAssetsByUnitRepository.loadByUnitId(unitId)
    return companies
  }
}
