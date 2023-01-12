import { AddCompanyRepository } from '@/data/protocols/db/company/add-company-repository'
import { CompanyModel } from '@/domain/modals/company'
import { AddCompany, AddCompanyModel } from '@/domain/usecases/company/add-company'

export class DbAddCompany implements AddCompany {
  constructor(private readonly addCompanyRepository: AddCompanyRepository) {}

  async add(companyData: AddCompanyModel): Promise<CompanyModel> {
    const company = await this.addCompanyRepository.add(companyData)
    return company
  }
}
