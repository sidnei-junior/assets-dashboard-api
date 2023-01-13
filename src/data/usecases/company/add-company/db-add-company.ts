import { AddCompanyRepository } from '@/data/protocols/db/company/add-company-repository'
import { LoadCompanyByCnpjRepository } from '@/data/protocols/db/company/load-company-by-cnpj-repository'
import { CompanyModel } from '@/domain/models/company'
import { AddCompany, AddCompanyModel } from '@/domain/usecases/company/add-company'

export class DbAddCompany implements AddCompany {
  constructor(
    private readonly addCompanyRepository: AddCompanyRepository,
    private readonly loadCompanyByCnpjRepository: LoadCompanyByCnpjRepository
  ) {}

  async add(companyData: AddCompanyModel): Promise<CompanyModel> {
    const cnpjAlreadyRegistered = await this.loadCompanyByCnpjRepository.loadByCnpj(companyData.cnpj)

    if (cnpjAlreadyRegistered) {
      return null
    }

    const company = await this.addCompanyRepository.add(companyData)
    return company
  }
}
