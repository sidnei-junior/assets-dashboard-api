import { CompanyModel } from '@/domain/models/company'

export interface LoadCompanyByIdRepository {
  loadById: (id: string) => Promise<CompanyModel>
}
