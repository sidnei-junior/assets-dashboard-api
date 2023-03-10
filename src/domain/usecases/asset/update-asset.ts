import { AssetModel } from '@/domain/models/asset'

export type UpdateAssetModel = Omit<AssetModel, 'id' | 'companyId'> & { companyId?: string }

export interface UpdateAsset {
  update: (assetData: UpdateAssetModel, id: string) => Promise<AssetModel | string>
}
