import { CompanyModel } from '@/domain/models/company'

export type UpdateCompanyModel = Omit<CompanyModel, 'id'>

export interface UpdateCompany {
  update: (companyData: UpdateCompanyModel, id: string) => Promise<CompanyModel>
}
