import { AssetModel } from '@/domain/models/asset'
import { AddAssetModel } from '@/domain/usecases/asset/add-asset'

export interface AddAssetRepository {
  add: (assetData: AddAssetModel) => Promise<AssetModel>
}
