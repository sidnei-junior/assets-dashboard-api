import { UnitModel } from '@/domain/models/unit'

export interface LoadUnitByIdRepository {
  loadById: (id: string) => Promise<UnitModel>
}
