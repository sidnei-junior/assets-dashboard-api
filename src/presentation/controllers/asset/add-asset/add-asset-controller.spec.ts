import { AssetModel } from '@/domain/models/asset'
import { AddAsset, AddAssetModel } from '@/domain/usecases/asset/add-asset'
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
import { AddAssetController } from './add-asset-controller'

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
  }
})

const makeAddAsset = (): AddAsset => {
  class AddAssetStub implements AddAsset {
    async add(assetData: AddAssetModel): Promise<AssetModel> {
      return makeFakeAsset()
    }
  }

  return new AddAssetStub()
}

const makeFakeAsset = (): AssetModel => ({
  id: 'any_id',
  unitId: 'any_unit_id',
  ownerId: 'any_owner_id',
  companyId: 'any_company_id',
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
  sut: AddAssetController
  addAssetStub: AddAsset
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAssetStub = makeAddAsset()
  const validationStub = makeValidation()
  const sut = new AddAssetController(addAssetStub, validationStub)
  return { sut, addAssetStub, validationStub }
}

describe('AddAsset Controller', () => {
  test('Should call AddAsset with correct values', async () => {
    const { sut, addAssetStub } = makeSut()
    const addSpy = jest.spyOn(addAssetStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      unitId: 'any_unit_id',
      ownerId: 'any_owner_id',
      name: 'any_name',
      image: 'any_image',
      description: 'any_description',
      model: 'any_model',
      status: 0,
      healthLevel: 100
    })
  })

  test('Should return 500 if AddAsset throws', async () => {
    const { sut, addAssetStub } = makeSut()
    jest.spyOn(addAssetStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if AddAsset returns string', async () => {
    const { sut, addAssetStub } = makeSut()
    jest.spyOn(addAssetStub, 'add').mockReturnValueOnce(new Promise((resolve) => resolve('any_resource')))
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
