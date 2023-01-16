import { LoadAssetsByCompanyRepository } from '@/data/protocols/db/asset/load-assets-by-company-repository'
import { AssetModel } from '@/domain/models/asset'
import { LoadAssetsByCompany } from '@/domain/usecases/asset/load-assets-by-company'

export class DbLoadAssetsByCompany implements LoadAssetsByCompany {
  constructor(private readonly loadAssetsByCompanyRepository: LoadAssetsByCompanyRepository) {}
  async load(companyId: string): Promise<AssetModel[]> {
    const companies = await this.loadAssetsByCompanyRepository.loadByCompanyId(companyId)
    return companies
  }
}
