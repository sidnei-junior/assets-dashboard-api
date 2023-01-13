import { CompanyModel } from '@/domain/models/company'

export type AddCompanyModel = Omit<CompanyModel, 'id'>

export interface AddCompany {
  add: (companyData: AddCompanyModel) => Promise<CompanyModel>
}
