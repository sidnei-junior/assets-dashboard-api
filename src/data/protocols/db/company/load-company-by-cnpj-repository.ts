import { CompanyModel } from '@/domain/models/company'

export interface LoadCompanyByCnpjRepository {
  loadByCnpj: (cnpj: string) => Promise<CompanyModel>
}
