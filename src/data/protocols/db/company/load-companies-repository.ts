import { CompanyModel } from '@/domain/models/company'

export interface LoadCompaniesRepository {
  loadAll: () => Promise<CompanyModel[]>
}
