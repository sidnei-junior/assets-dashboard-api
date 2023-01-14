import { LoadCompanyByIdRepository } from '@/data/protocols/db/company/load-company-by-id-repository'
import { AddUnitRepository } from '@/data/protocols/db/unit/add-unit-repository'
import { UnitModel } from '@/domain/models/unit'
import { AddUnit, AddUnitModel } from '@/domain/usecases/unit/add-unit'

export class DbAddUnit implements AddUnit {
  constructor(
    private readonly addUnitRepository: AddUnitRepository,
    private readonly loadCompanyByIdRepository: LoadCompanyByIdRepository
  ) {}

  async add(unitData: AddUnitModel): Promise<UnitModel> {
    const response = await this.loadCompanyByIdRepository.loadById(unitData.companyId)

    if (response === null) {
      return null
    }

    const unit = await this.addUnitRepository.add(unitData)
    return unit
  }
}
