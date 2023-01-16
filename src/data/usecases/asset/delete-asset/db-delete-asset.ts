import { DeleteAssetRepository } from '@/data/protocols/db/asset/delete-asset-repository'
import { DeleteAsset } from '@/domain/usecases/asset/delete-asset'

export class DbDeleteAsset implements DeleteAsset {
  constructor(private readonly deleteAssetRepository: DeleteAssetRepository) {}

  async delete(id: string): Promise<void> {
    const response = await this.deleteAssetRepository.delete(id)
    if (response === null) {
      return response
    }
  }
}
