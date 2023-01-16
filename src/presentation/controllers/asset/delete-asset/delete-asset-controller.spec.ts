import { DeleteAsset } from '@/domain/usecases/asset/delete-asset'
import { HttpRequest } from '../../account/login/login-controller-protocols'
import { noContent, notFound, ServerError, serverError } from '../../account/signup/signup-controller-protocols'
import { DeleteAssetController } from './delete-asset-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    assetId: 'any_id'
  }
})

const makeDeleteAsset = (): DeleteAsset => {
  class DeleteAssetStub implements DeleteAsset {
    async delete(id: string): Promise<void> {}
  }

  return new DeleteAssetStub()
}

type SutTypes = {
  sut: DeleteAssetController
  deleteAssetStub: DeleteAsset
}

const makeSut = (): SutTypes => {
  const deleteAssetStub = makeDeleteAsset()
  const sut = new DeleteAssetController(deleteAssetStub)
  return { sut, deleteAssetStub }
}

describe('DeleteAsset Controller', () => {
  test('Should call DeleteAsset with correct value', async () => {
    const { sut, deleteAssetStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteAssetStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 404 if DeleteAsset return null', async () => {
    const { sut, deleteAssetStub } = makeSut()
    jest.spyOn(deleteAssetStub, 'delete').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if DeleteAsset throws', async () => {
    const { sut, deleteAssetStub } = makeSut()
    jest.spyOn(deleteAssetStub, 'delete').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
