import { AssetModel } from '@/domain/models/asset'

export interface LoadAssetsByUnit {
  load: (unitId: string) => Promise<AssetModel[]>
}
