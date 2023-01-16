import { DeleteAssetRepository } from '@/data/protocols/db/asset/delete-asset-repository'
import { DbDeleteAsset } from './db-delete-asset'

const makeDeleteAssetRepository = (): DeleteAssetRepository => {
  class DeleteAssetRepositoryStub implements DeleteAssetRepository {
    async delete(id: string): Promise<void> {}
  }

  return new DeleteAssetRepositoryStub()
}

type SutTypes = {
  sut: DbDeleteAsset
  deleteAssetRepositoryStub: DeleteAssetRepository
}

const makeSut = (): SutTypes => {
  const deleteAssetRepositoryStub = makeDeleteAssetRepository()
  const sut = new DbDeleteAsset(deleteAssetRepositoryStub)
  return { sut, deleteAssetRepositoryStub }
}

describe('DbDeleteAsset Usecase', () => {
  test('Should call DeleteAssetRepository with correct value', async () => {
    const { sut, deleteAssetRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteAssetRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return null if DeleteAssetRepository return null', async () => {
    const { sut, deleteAssetRepositoryStub } = makeSut()
    jest.spyOn(deleteAssetRepositoryStub, 'delete').mockReturnValueOnce(null)
    const response = await sut.delete('any_id')
    expect(response).toBeNull()
  })
})
