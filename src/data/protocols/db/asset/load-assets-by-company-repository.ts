import { AssetModel } from '@/domain/models/asset'

export interface LoadAssetsByCompanyRepository {
  loadByCompanyId: (companyId: string) => Promise<AssetModel[]>
}
