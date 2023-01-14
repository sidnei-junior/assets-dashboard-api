import { DeleteUnitRepository } from '@/data/protocols/db/unit/delete-unit-repository'
import { DbDeleteUnit } from './db-delete-delete'

const makeDeleteUnitRepository = (): DeleteUnitRepository => {
  class DeleteUnitRepositoryStub implements DeleteUnitRepository {
    async delete(id: string): Promise<void> {}
  }

  return new DeleteUnitRepositoryStub()
}

type SutTypes = {
  sut: DbDeleteUnit
  deleteUnitRepositoryStub: DeleteUnitRepository
}

const makeSut = (): SutTypes => {
  const deleteUnitRepositoryStub = makeDeleteUnitRepository()
  const sut = new DbDeleteUnit(deleteUnitRepositoryStub)
  return { sut, deleteUnitRepositoryStub }
}

describe('DbDeleteUnit Usecase', () => {
  test('Should call DeleteUnitRepository with correct value', async () => {
    const { sut, deleteUnitRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteUnitRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return null if DeleteUnitRepository return null', async () => {
    const { sut, deleteUnitRepositoryStub } = makeSut()
    jest.spyOn(deleteUnitRepositoryStub, 'delete').mockReturnValueOnce(null)
    const response = await sut.delete('any_id')
    expect(response).toBeNull()
  })
})
