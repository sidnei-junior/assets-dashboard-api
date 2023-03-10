import { UnitModel } from '@/domain/models/unit'
import { UpdateUnitModel } from '@/domain/usecases/unit/update-unit'

export interface UpdateUnitRepository {
  update: (unitData: UpdateUnitModel, id: string) => Promise<UnitModel | string>
}
