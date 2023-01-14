import { AddUnitRepository } from '@/data/protocols/db/unit/add-unit-repository'
import { UnitModel } from '@/domain/models/unit'
import { AddUnitModel } from '@/domain/usecases/unit/add-unit'
import { MongoHelper } from '../helper/mongo-helper'

export class UnitMongoRepository implements AddUnitRepository {
  async add(unitData: AddUnitModel): Promise<UnitModel> {
    const unitCollection = await MongoHelper.getCollection('units')
    const result = await unitCollection.insertOne(unitData)
    const { insertedId: id } = result
    const unitById = await unitCollection.findOne({ _id: id })
    const unit = MongoHelper.map(unitById)
    return unit
  }
}
