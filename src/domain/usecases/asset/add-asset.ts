import { AssetModel } from '@/domain/models/asset'

export type AddAssetModel = Omit<AssetModel, 'id' | 'companyId'> & { companyId?: string }

export interface AddAsset {
  add: (assetData: AddAssetModel) => Promise<AssetModel | string>
}
