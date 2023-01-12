import { CompanyModel } from '@/domain/modals/company'

export interface LoadCompanyByCnpjRepository {
  loadByCnpj: (cnpj: string) => Promise<CompanyModel>
}
