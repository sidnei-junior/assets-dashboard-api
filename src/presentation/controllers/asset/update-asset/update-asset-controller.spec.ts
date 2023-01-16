import { AssetModel } from '@/domain/models/asset'
import { UpdateAsset, UpdateAssetModel } from '@/domain/usecases/asset/update-asset'
import { HttpRequest, Validation } from '../../account/login/login-controller-protocols'
import {
  badRequest,
  MissingParamError,
  notFound,
  NotFoundError,
  ok,
  ServerError,
  serverError
} from '../../account/signup/signup-controller-protocols'
import { UpdateAssetController } from './update-asset-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    unitId: 'any_unit_id',
    ownerId: 'any_owner_id',
    name: 'any_name',
    image: 'any_image',
    description: 'any_description',
    model: 'any_model',
    status: 0,
    healthLevel: 100
  },
  params: { assetId: 'any_id' }
})

const makeUpdateAsset = (): UpdateAsset => {
  class UpdateAssetStub implements UpdateAsset {
    async update(assetData: UpdateAssetModel, id: string): Promise<AssetModel | string> {
      return makeFakeAsset()
    }
  }

  return new UpdateAssetStub()
}

const makeFakeAsset = (): AssetModel => ({
  id: 'any_id',
  companyId: 'any_company_id',
  unitId: 'any_unit_id',
  ownerId: 'any_owner_id',
  name: 'any_name',
  image: 'any_image',
  description: 'any_description',
  model: 'any_model',
  status: 0,
  healthLevel: 100
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  updateAssetStub: UpdateAsset
  validationStub: Validation
  sut: UpdateAssetController
}

const makeSut = (): SutTypes => {
  const updateAssetStub = makeUpdateAsset()
  const validationStub = makeValidation()
  const sut = new UpdateAssetController(updateAssetStub, validationStub)
  return { sut, updateAssetStub, validationStub }
}

describe('UpdateAsset Controller', () => {
  test('Should call UpdateAsset with correct values', async () => {
    const { sut, updateAssetStub } = makeSut()
    const updateSpy = jest.spyOn(updateAssetStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(updateSpy).toHaveBeenCalledWith(
      {
        unitId: 'any_unit_id',
        ownerId: 'any_owner_id',
        name: 'any_name',
        image: 'any_image',
        description: 'any_description',
        model: 'any_model',
        status: 0,
        healthLevel: 100
      },
      'any_id'
    )
  })

  test('Should return 500 if UpdateAsset throws', async () => {
    const { sut, updateAssetStub } = makeSut()
    jest.spyOn(updateAssetStub, 'update').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404  if UpdateAsset returns string', async () => {
    const { sut, updateAssetStub } = makeSut()
    jest.spyOn(updateAssetStub, 'update').mockReturnValueOnce(new Promise((resolve) => resolve('any_resource')))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound(new NotFoundError('any_resource')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAsset()))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
