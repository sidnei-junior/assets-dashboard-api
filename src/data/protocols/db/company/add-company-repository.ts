import { CompanyModel } from '@/domain/modals/company'
import { AddCompanyModel } from '@/domain/usecases/company/add-company'

export interface AddCompanyRepository {
  add: (companyData: AddCompanyModel) => Promise<CompanyModel>
}
