import { AssetModel } from '@/domain/models/asset'
import { LoadAssetsByUnit } from '@/domain/usecases/asset/load-assets-by-unit'
import { HttpRequest } from '../../account/login/login-controller-protocols'
import { noContent, ok, serverError } from '../../account/signup/signup-controller-protocols'
import { LoadAssetsByUnitController } from './load-assets-by-unit-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    unitId: 'any_unit_id'
  }
})

const makeLoadAssetsByUnit = (): LoadAssetsByUnit => {
  class LoadAssetsByUnitStub implements LoadAssetsByUnit {
    async load(unitId: string): Promise<AssetModel[]> {
      return makeFakeAssets()
    }
  }

  return new LoadAssetsByUnitStub()
}

const makeFakeAssets = (): AssetModel[] => [
  {
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
  },
  {
    id: 'other_id',
    unitId: 'other_unit_id',
    ownerId: 'other_owner_id',
    companyId: 'other_company_id',
    name: 'other_name',
    image: 'other_image',
    description: 'other_description',
    model: 'other_model',
    status: 0,
    healthLevel: 100
  }
]

type SutTypes = {
  sut: LoadAssetsByUnitController
  loadAssetsByUnitStub: LoadAssetsByUnit
}

const makeSut = (): SutTypes => {
  const loadAssetsByUnitStub = makeLoadAssetsByUnit()
  const sut = new LoadAssetsByUnitController(loadAssetsByUnitStub)

  return { sut, loadAssetsByUnitStub }
}

describe('LoadAssetsByUnit Controller', () => {
  test('Should call LoadAssetsByUnit with correct value', async () => {
    const { sut, loadAssetsByUnitStub } = makeSut()
    const loadSpy = jest.spyOn(loadAssetsByUnitStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_unit_id')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAssets()))
  })

  test('Should return 204 if LoadAssetsByUnit returns empty', async () => {
    const { sut, loadAssetsByUnitStub } = makeSut()
    jest.spyOn(loadAssetsByUnitStub, 'load').mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadAssetsByUnit throws', async () => {
    const { sut, loadAssetsByUnitStub } = makeSut()
    jest.spyOn(loadAssetsByUnitStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
