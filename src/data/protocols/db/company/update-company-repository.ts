import { CompanyModel } from '@/domain/models/company'
import { UpdateCompanyModel } from '@/domain/usecases/company/update-company'

export interface UpdateCompanyRepository {
  update: (companyData: UpdateCompanyModel, id: string) => Promise<CompanyModel>
}
