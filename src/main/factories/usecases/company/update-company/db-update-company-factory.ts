import { DbUpdateCompany } from '@/data/usecases/company/update-company/db-update-company'
import { UpdateCompany } from '@/domain/usecases/company/update-company'
import { CompanyMongoRepository } from '@/infra/db/mongodb/company/company-mongo-repository'

export const makeDbUpdateCompany = (): UpdateCompany => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new DbUpdateCompany(companyMongoRepository)
}
