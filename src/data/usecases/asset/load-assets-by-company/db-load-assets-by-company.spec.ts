import { LoadAssetsByCompanyRepository } from '@/data/protocols/db/asset/load-assets-by-company-repository'
import { AssetModel } from '@/domain/models/asset'
import { DbLoadAssetsByCompany } from './db-load-assets-by-company'

const makeFakeAssetsByCompany = (): AssetModel[] => [
  {
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
  },
  {
    id: 'other_id',
    companyId: 'any_company_id',
    unitId: 'any_unit_id',
    ownerId: 'any_owner_id',
    name: 'other_name',
    image: 'other_image',
    description: 'other_description',
    model: 'other_model',
    status: 0,
    healthLevel: 100
  }
]

const makeLoadAssetsByCompanyRepository = (): LoadAssetsByCompanyRepository => {
  class LoadAssetsByCompanyRepositoryStub implements LoadAssetsByCompanyRepository {
    async loadByCompanyId(): Promise<AssetModel[]> {
      return makeFakeAssetsByCompany()
    }
  }

  return new LoadAssetsByCompanyRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAssetsByCompany
  loadAssetsByCompanyRepositoryStub: LoadAssetsByCompanyRepository
}

const makeSut = (): SutTypes => {
  const loadAssetsByCompanyRepositoryStub = makeLoadAssetsByCompanyRepository()
  const sut = new DbLoadAssetsByCompany(loadAssetsByCompanyRepositoryStub)
  return { sut, loadAssetsByCompanyRepositoryStub }
}

describe('DbLoadAssetsByCompany Usecase', () => {
  test('Should call LoadAssetsByCompanyRepository with correct value', async () => {
    const { sut, loadAssetsByCompanyRepositoryStub } = makeSut()
    const loadByCompanyIdSpy = jest.spyOn(loadAssetsByCompanyRepositoryStub, 'loadByCompanyId')
    await sut.load('any_company_id')
    expect(loadByCompanyIdSpy).toHaveBeenCalledWith('any_company_id')
  })

  test('Should return a list of assets on success', async () => {
    const { sut } = makeSut()
    const companies = await sut.load('any_company_id')
    expect(companies).toEqual(makeFakeAssetsByCompany())
  })

  test('Should throw if LoadAssetsByCompanyRepository throws ', async () => {
    const { sut, loadAssetsByCompanyRepositoryStub } = makeSut()
    jest
      .spyOn(loadAssetsByCompanyRepositoryStub, 'loadByCompanyId')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_company_id')
    void expect(promise).rejects.toThrow()
  })
})
