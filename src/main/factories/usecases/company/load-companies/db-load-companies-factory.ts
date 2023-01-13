import { DbLoadCompanies } from '@/data/usecases/company/load-companies/db-load-companies'
import { CompanyMongoRepository } from '@/infra/db/mongodb/company/company-mongo-repository'

export const makeDbLoadCompanies = (): DbLoadCompanies => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new DbLoadCompanies(companyMongoRepository)
}
