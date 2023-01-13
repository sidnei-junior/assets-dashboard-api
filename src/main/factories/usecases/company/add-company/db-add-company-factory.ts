import { DbAddCompany } from '@/data/usecases/company/add-company/db-add-company'
import { AddCompany } from '@/domain/usecases/company/add-company'
import { CompanyMongoRepository } from '@/infra/db/mongodb/company/company-mongo-repository'

export const makeDbAddCompany = (): AddCompany => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new DbAddCompany(companyMongoRepository, companyMongoRepository)
}
