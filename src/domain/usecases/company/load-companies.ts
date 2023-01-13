import { CompanyModel } from '@/domain/models/company'

export interface LoadCompanies {
  load: () => Promise<CompanyModel[]>
}
