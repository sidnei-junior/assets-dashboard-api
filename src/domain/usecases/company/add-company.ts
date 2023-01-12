import { CompanyModel } from '@/domain/modals/company'

export type AddCompanyModel = Omit<CompanyModel, 'id'>

export interface AddCompany {
  add: (company: AddCompanyModel) => Promise<CompanyModel>
}
