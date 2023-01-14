import { UnitModel } from '@/domain/models/unit'

export type UpdateUnitModel = Omit<UnitModel, 'id'>

export interface UpdateUnit {
  update: (unitData: UpdateUnitModel, id: string) => Promise<UnitModel | string>
}
