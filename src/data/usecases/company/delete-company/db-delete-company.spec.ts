import { DeleteCompanyRepository } from '@/data/protocols/db/company/delete-company-repository'
import { DbDeleteCompany } from './db-delete-company'

const makeDeleteCompanyRepository = (): DeleteCompanyRepository => {
  class DeleteCompanyRepositoryStub implements DeleteCompanyRepository {
    async delete(id: string): Promise<void> {}
  }

  return new DeleteCompanyRepositoryStub()
}

type SutTypes = {
  sut: DbDeleteCompany
  deleteCompanyRepositoryStub: DeleteCompanyRepository
}

const makeSut = (): SutTypes => {
  const deleteCompanyRepositoryStub = makeDeleteCompanyRepository()
  const sut = new DbDeleteCompany(deleteCompanyRepositoryStub)
  return { sut, deleteCompanyRepositoryStub }
}

describe('DbDeleteCompany Usecase', () => {
  test('Should call DeleteCompanyRepository with correct value', async () => {
    const { sut, deleteCompanyRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteCompanyRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return null if DeleteCompanyRepository return null', async () => {
    const { sut, deleteCompanyRepositoryStub } = makeSut()
    jest.spyOn(deleteCompanyRepositoryStub, 'delete').mockReturnValueOnce(null)
    const response = await sut.delete('any_id')
    expect(response).toBeNull()
  })
})
