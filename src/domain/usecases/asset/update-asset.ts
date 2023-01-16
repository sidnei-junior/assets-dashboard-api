import { AssetModel } from '@/domain/models/asset'

export type UpdateAssetModel = Omit<AssetModel, 'id'>

export interface UpdateAsset {
  update: (assetData: UpdateAssetModel, id: string) => Promise<AssetModel | string>
}
