import { AddUnitRepository } from '@/data/protocols/db/unit/add-unit-repository'
import { UnitModel } from '@/domain/models/unit'
import { AddUnit, AddUnitModel } from '@/domain/usecases/unit/add-unit'

export class DbAddUnit implements AddUnit {
  constructor(private readonly addUnitRepository: AddUnitRepository) {}

  async add(unitData: AddUnitModel): Promise<UnitModel> {
    await this.addUnitRepository.add(unitData)
    return null
  }
}
