import { AssetModel } from '@/domain/models/asset'
import { UpdateAssetModel } from '@/domain/usecases/asset/update-asset'

export interface UpdateAssetRepository {
  update: (assetData: UpdateAssetModel, id: string) => Promise<AssetModel | string>
}
