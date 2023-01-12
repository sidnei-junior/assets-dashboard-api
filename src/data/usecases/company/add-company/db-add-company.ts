import { AddCompanyRepository } from '@/data/protocols/db/company/add-company-repository'
import { LoadCompanyByCnpjRepository } from '@/data/protocols/db/company/load-company-by-cnpj-repository'
import { CompanyModel } from '@/domain/modals/company'
import { AddCompany, AddCompanyModel } from '@/domain/usecases/company/add-company'

export class DbAddCompany implements AddCompany {
  constructor(
    private readonly addCompanyRepository: AddCompanyRepository,
    private readonly loadCompanyByCnpjRepository: LoadCompanyByCnpjRepository
  ) {}

  async add(companyData: AddCompanyModel): Promise<CompanyModel> {
    await this.loadCompanyByCnpjRepository.loadByCnpj(companyData.cnpj)

    const company = await this.addCompanyRepository.add(companyData)
    return company
  }
}
