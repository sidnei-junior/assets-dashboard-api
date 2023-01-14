import { DeleteUnitRepository } from '@/data/protocols/db/unit/delete-unit-repository'
import { DeleteUnit } from '@/domain/usecases/unit/delete-unit'

export class DbDeleteUnit implements DeleteUnit {
  constructor(private readonly deleteUnitRepository: DeleteUnitRepository) {}

  async delete(id: string): Promise<void> {
    const response = await this.deleteUnitRepository.delete(id)
    if (response === null) {
      return response
    }
  }
}
