import { AssetModel } from '@/domain/models/asset'

export interface LoadAssetsByCompany {
  load: (companyId: string) => Promise<AssetModel[]>
}
