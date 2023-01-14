import { UpdateCompanyRepository } from '@/data/protocols/db/company/update-company-repository'
import { CompanyModel } from '@/domain/models/company'
import { UpdateCompany, UpdateCompanyModel } from '@/domain/usecases/company/update-company'

export class DbUpdateCompany implements UpdateCompany {
  constructor(private readonly updateCompanyRepository: UpdateCompanyRepository) {}

  async update(companyData: UpdateCompanyModel, id: string): Promise<CompanyModel> {
    const company = await this.updateCompanyRepository.update(companyData, id)
    return company
  }
}
