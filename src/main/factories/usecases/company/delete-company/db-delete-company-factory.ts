import { DbDeleteCompany } from '@/data/usecases/company/delete-company/db-delete-company'
import { DeleteCompany } from '@/domain/usecases/company/delete-company'
import { CompanyMongoRepository } from '@/infra/db/mongodb/company/company-mongo-repository'

export const makeDbDeleteCompany = (): DeleteCompany => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new DbDeleteCompany(companyMongoRepository)
}
