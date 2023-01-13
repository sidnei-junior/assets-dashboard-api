import { DeleteCompany } from '@/domain/usecases/company/delete-company'
import { noContent, notFound } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { DeleteCompanyController } from './delete-company-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    companyId: 'any_id'
  }
})

const makeDeleteCompany = (): DeleteCompany => {
  class DeleteCompanyStub implements DeleteCompany {
    async delete(id: string): Promise<void> {}
  }

  return new DeleteCompanyStub()
}

type SutTypes = {
  sut: DeleteCompanyController
  deleteCompanyStub: DeleteCompany
}

const makeSut = (): SutTypes => {
  const deleteCompanyStub = makeDeleteCompany()
  const sut = new DeleteCompanyController(deleteCompanyStub)
  return { sut, deleteCompanyStub }
}

describe('DeleteCompany Controller', () => {
  test('Should call DeleteCompany with correct value', async () => {
    const { sut, deleteCompanyStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteCompanyStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 404 if DeleteCompany return null', async () => {
    const { sut, deleteCompanyStub } = makeSut()
    jest.spyOn(deleteCompanyStub, 'delete').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
