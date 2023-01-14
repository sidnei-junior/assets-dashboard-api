import { DbDeleteUnit } from '@/data/usecases/unit/delete-unit/db-delete-delete'
import { DeleteUnit } from '@/domain/usecases/unit/delete-unit'
import { UnitMongoRepository } from '@/infra/db/mongodb/unit/unit-mongo-repository'

export const makeDbDeleteUnit = (): DeleteUnit => {
  const unitMongoRepository = new UnitMongoRepository()
  return new DbDeleteUnit(unitMongoRepository)
}
