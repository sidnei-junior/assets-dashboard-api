import { AddCompanyRepository } from '@/data/protocols/db/company/add-company-repository'
import { CompanyModel } from '@/domain/modals/company'
import { AddCompany, AddCompanyModel } from '@/domain/usecases/company/add-company'

export class DbAddCompany implements AddCompany {
  constructor(private readonly addCompanyRepository: AddCompanyRepository) {}

  async add(company: AddCompanyModel): Promise<CompanyModel> {
    await this.addCompanyRepository.add(company)
    return null
  }
}
