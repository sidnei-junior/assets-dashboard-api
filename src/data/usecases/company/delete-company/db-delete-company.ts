import { DeleteCompanyRepository } from '@/data/protocols/db/company/delete-company-repository'
import { DeleteCompany } from '@/domain/usecases/company/delete-company'

export class DbDeleteCompany implements DeleteCompany {
  constructor(private readonly deleteCompanyRepository: DeleteCompanyRepository) {}

  async delete(id: string): Promise<void> {
    const response = await this.deleteCompanyRepository.delete(id)
    if (response === null) {
      return response
    }
  }
}
