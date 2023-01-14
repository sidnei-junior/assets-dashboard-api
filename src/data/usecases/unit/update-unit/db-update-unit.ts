import { LoadCompanyByIdRepository } from '@/data/protocols/db/company/load-company-by-id-repository'
import { UpdateUnitRepository } from '@/data/protocols/db/unit/update-unit-repository'
import { UnitModel } from '@/domain/models/unit'
import { UpdateUnit, UpdateUnitModel } from '@/domain/usecases/unit/update-unit'

export class DbUpdateUnit implements UpdateUnit {
  constructor(
    private readonly updateUnitRepository: UpdateUnitRepository,
    private readonly loadCompanyByIdRepository: LoadCompanyByIdRepository
  ) {}

  async update(unitData: UpdateUnitModel, id: string): Promise<UnitModel | string> {
    const response = await this.loadCompanyByIdRepository.loadById(unitData.companyId)

    if (response === null) {
      return 'company'
    }

    const unit = await this.updateUnitRepository.update(unitData, id)
    return unit
  }
}
