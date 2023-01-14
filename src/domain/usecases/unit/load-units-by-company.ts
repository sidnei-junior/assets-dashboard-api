import { UnitModel } from '@/domain/models/unit'

export interface LoadUnitsByCompany {
  load: (companyId: string) => Promise<UnitModel[]>
}
