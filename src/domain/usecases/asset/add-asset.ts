import { AssetModel } from '@/domain/models/asset'

export type AddAssetModel = Omit<AssetModel, 'id'>

export interface AddAsset {
  add: (assetData: AddAssetModel) => Promise<AssetModel>
}
