import { DbLoadUnitsByCompany } from '@/data/usecases/unit/load-units-by-company/db-load-units-by-company'
import { LoadUnitsByCompany } from '@/domain/usecases/unit/load-units-by-company'
import { UnitMongoRepository } from '@/infra/db/mongodb/unit/unit-mongo-repository'

export const makeDbLoadUnitsByCompany = (): LoadUnitsByCompany => {
  const unitMongoRepository = new UnitMongoRepository()
  return new DbLoadUnitsByCompany(unitMongoRepository)
}
