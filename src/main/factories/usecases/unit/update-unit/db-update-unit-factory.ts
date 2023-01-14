import { DbUpdateUnit } from '@/data/usecases/unit/update-unit/db-update-unit'
import { UpdateUnit } from '@/domain/usecases/unit/update-unit'
import { CompanyMongoRepository } from '@/infra/db/mongodb/company/company-mongo-repository'
import { UnitMongoRepository } from '@/infra/db/mongodb/unit/unit-mongo-repository'

export const makeDbUpdateUnit = (): UpdateUnit => {
  const unitMongoRepository = new UnitMongoRepository()
  const companyMongoRepository = new CompanyMongoRepository()
  return new DbUpdateUnit(unitMongoRepository, companyMongoRepository)
}
