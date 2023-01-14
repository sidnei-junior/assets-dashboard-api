import { LoadUnitsByCompanyRepository } from '@/data/protocols/db/unit/load-units-by-company-repository'
import { UnitModel } from '@/domain/models/unit'
import { LoadUnitsByCompany } from '@/domain/usecases/unit/load-units-by-company'

export class DbLoadUnitsByCompany implements LoadUnitsByCompany {
  constructor(private readonly loadUnitsByCompanyRepository: LoadUnitsByCompanyRepository) {}
  async load(companyId: string): Promise<UnitModel[]> {
    const companies = await this.loadUnitsByCompanyRepository.loadByCompanyId(companyId)
    return companies
  }
}
