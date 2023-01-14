import { UnitModel } from '@/domain/models/unit'

export type UpdateUnitModel = Omit<UnitModel, 'id'>

export enum ResourceLabelNotFound {
  Unit = 'unit',
  Company = 'company'
}

export interface UpdateUnit {
  update: (unitData: UpdateUnitModel, id: string) => Promise<UnitModel | ResourceLabelNotFound>
}
