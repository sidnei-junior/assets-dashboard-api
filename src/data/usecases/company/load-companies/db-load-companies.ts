import { LoadCompaniesRepository } from '@/data/protocols/db/company/load-companies-repository'
import { CompanyModel } from '@/domain/models/company'
import { LoadCompanies } from '@/domain/usecases/company/load-companies'

export class DbLoadCompanies implements LoadCompanies {
  constructor(private readonly loadCompaniesRepository: LoadCompaniesRepository) {}
  async load(): Promise<CompanyModel[]> {
    const companies = await this.loadCompaniesRepository.loadAll()
    return companies
  }
}
