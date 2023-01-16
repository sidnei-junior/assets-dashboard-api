import { AssetModel } from '@/domain/models/asset'
import { LoadAssetsByCompany } from '@/domain/usecases/asset/load-assets-by-company'
import { HttpRequest } from '../../account/login/login-controller-protocols'
import { noContent, ok, serverError } from '../../account/signup/signup-controller-protocols'
import { LoadAssetsByCompanyController } from './load-assets-by-company-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    companyId: 'any_company_id'
  }
})

const makeLoadAssetsByCompany = (): LoadAssetsByCompany => {
  class LoadAssetsByCompanyStub implements LoadAssetsByCompany {
    async load(companyId: string): Promise<AssetModel[]> {
      return makeFakeAssets()
    }
  }

  return new LoadAssetsByCompanyStub()
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
  sut: LoadAssetsByCompanyController
  loadAssetsByCompanyStub: LoadAssetsByCompany
}

const makeSut = (): SutTypes => {
  const loadAssetsByCompanyStub = makeLoadAssetsByCompany()
  const sut = new LoadAssetsByCompanyController(loadAssetsByCompanyStub)

  return { sut, loadAssetsByCompanyStub }
}

describe('LoadAssetsByCompany Controller', () => {
  test('Should call LoadAssetsByCompany with correct value', async () => {
    const { sut, loadAssetsByCompanyStub } = makeSut()
    const loadSpy = jest.spyOn(loadAssetsByCompanyStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_company_id')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAssets()))
  })

  test('Should return 204 if LoadAssetsByCompany returns empty', async () => {
    const { sut, loadAssetsByCompanyStub } = makeSut()
    jest.spyOn(loadAssetsByCompanyStub, 'load').mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadAssetsByCompany throws', async () => {
    const { sut, loadAssetsByCompanyStub } = makeSut()
    jest
      .spyOn(loadAssetsByCompanyStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
