import { UnitModel } from '@/domain/models/unit'
import { AddUnitModel } from '@/domain/usecases/unit/add-unit'

export interface AddUnitRepository {
  add: (unitData: AddUnitModel) => Promise<UnitModel>
}
