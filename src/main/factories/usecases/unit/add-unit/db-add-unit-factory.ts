import { DbAddUnit } from '@/data/usecases/unit/add-unit/db-add-unit'
import { AddUnit } from '@/domain/usecases/unit/add-unit'
import { CompanyMongoRepository } from '@/infra/db/mongodb/company/company-mongo-repository'
import { UnitMongoRepository } from '@/infra/db/mongodb/unit/unit-mongo-repository'

export const makeDbAddUnit = (): AddUnit => {
  const unitMongoRepository = new UnitMongoRepository()
  const companyMongoRepository = new CompanyMongoRepository()
  return new DbAddUnit(unitMongoRepository, companyMongoRepository)
}
