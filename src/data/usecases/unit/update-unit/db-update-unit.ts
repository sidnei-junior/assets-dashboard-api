import { UpdateUnitRepository } from '@/data/protocols/db/unit/update-unit-repository'
import { UnitModel } from '@/domain/models/unit'
import { ResourceLabelNotFound, UpdateUnit, UpdateUnitModel } from '@/domain/usecases/unit/update-unit'

export class DbUpdateUnit implements UpdateUnit {
  constructor(private readonly updateUnitRepository: UpdateUnitRepository) {}

  async update(unitData: UpdateUnitModel, id: string): Promise<UnitModel | ResourceLabelNotFound> {
    const unit = await this.updateUnitRepository.update(unitData, id)
    return unit
  }
}
