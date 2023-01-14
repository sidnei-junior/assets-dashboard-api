import { DeleteUnit } from '@/domain/usecases/unit/delete-unit'
import { HttpRequest } from '../../account/login/login-controller-protocols'
import { noContent, notFound, ServerError, serverError } from '../../account/signup/signup-controller-protocols'
import { DeleteUnitController } from './delete-company-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    unitId: 'any_id'
  }
})

const makeDeleteUnit = (): DeleteUnit => {
  class DeleteUnitStub implements DeleteUnit {
    async delete(id: string): Promise<void> {}
  }

  return new DeleteUnitStub()
}

type SutTypes = {
  sut: DeleteUnitController
  deleteUnitStub: DeleteUnit
}

const makeSut = (): SutTypes => {
  const deleteUnitStub = makeDeleteUnit()
  const sut = new DeleteUnitController(deleteUnitStub)
  return { sut, deleteUnitStub }
}

describe('DeleteUnit Controller', () => {
  test('Should call DeleteUnit with correct value', async () => {
    const { sut, deleteUnitStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteUnitStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 404 if DeleteUnit return null', async () => {
    const { sut, deleteUnitStub } = makeSut()
    jest.spyOn(deleteUnitStub, 'delete').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if DeleteUnit throws', async () => {
    const { sut, deleteUnitStub } = makeSut()
    jest.spyOn(deleteUnitStub, 'delete').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
