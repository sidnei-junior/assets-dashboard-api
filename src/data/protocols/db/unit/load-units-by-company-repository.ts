import { UnitModel } from '@/domain/models/unit'

export interface LoadUnitsByCompanyRepository {
  loadByCompanyId: (companyId: string) => Promise<UnitModel[]>
}
