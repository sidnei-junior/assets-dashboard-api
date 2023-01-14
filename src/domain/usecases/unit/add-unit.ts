import { UnitModel } from '@/domain/models/unit'

export type AddUnitModel = Omit<UnitModel, 'id'>

export interface AddUnit {
  add: (unitData: AddUnitModel) => Promise<UnitModel>
}
