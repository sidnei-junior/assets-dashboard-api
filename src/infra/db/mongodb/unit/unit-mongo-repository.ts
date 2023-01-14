import { AddUnitRepository } from '@/data/protocols/db/unit/add-unit-repository'
import { DeleteUnitRepository } from '@/data/protocols/db/unit/delete-unit-repository'
import { LoadUnitsByCompanyRepository } from '@/data/protocols/db/unit/load-units-by-company-repository'
import { UpdateUnitRepository } from '@/data/protocols/db/unit/update-unit-repository'
import { UnitModel } from '@/domain/models/unit'
import { AddUnitModel } from '@/domain/usecases/unit/add-unit'
import { UpdateUnitModel } from '@/domain/usecases/unit/update-unit'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'

export class UnitMongoRepository
  implements AddUnitRepository, LoadUnitsByCompanyRepository, DeleteUnitRepository, UpdateUnitRepository
{
  async add(unitData: AddUnitModel): Promise<UnitModel> {
    const unitCollection = await MongoHelper.getCollection('units')
    const result = await unitCollection.insertOne(unitData)
    const { insertedId: id } = result
    const unitById = await unitCollection.findOne({ _id: id })
    const unit = MongoHelper.map(unitById)
    return unit
  }

  async loadByCompanyId(companyId: string): Promise<UnitModel[]> {
    const unitCollection = await MongoHelper.getCollection('units')
    const units: UnitModel[] = (await unitCollection.find({ companyId }).toArray()) as unknown as UnitModel[]
    return units.map((unit) => MongoHelper.map(unit))
  }

  async delete(id: string): Promise<void> {
    const mongoId = new ObjectId(id)
    const unitCollection = await MongoHelper.getCollection('units')
    const mongoResponse = await unitCollection.deleteOne({ _id: mongoId })
    const { deletedCount } = mongoResponse
    if (deletedCount === 0) {
      return null
    }
  }

  async update(unitData: UpdateUnitModel, id: string): Promise<UnitModel | string> {
    const mongoId = new ObjectId(id)
    const unitCollection = await MongoHelper.getCollection('units')
    const { matchedCount } = await unitCollection.updateOne({ _id: mongoId }, { $set: { ...unitData } })
    if (matchedCount === 0) {
      return 'unit'
    }
    const unitById = await unitCollection.findOne({ _id: mongoId })
    const unit = MongoHelper.map(unitById)
    return unit
  }
}
