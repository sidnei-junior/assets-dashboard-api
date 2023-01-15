import { AssetModel } from '@/domain/models/asset'

export interface LoadAssetsByUnitRepository {
  loadByUnitId: (unitId: string) => Promise<AssetModel[]>
}
