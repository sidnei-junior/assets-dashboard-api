import { LoadCompaniesRepository } from '@/data/protocols/db/company/load-companies-repository'
import { CompanyModel } from '@/domain/models/company'
import { DbLoadCompanies } from './db-load-companies'

const makeFakeCompanies = (): CompanyModel[] => [
  {
    id: 'any_id',
    name: 'any_name',
    cnpj: 'any_cnpj'
  },
  {
    id: 'other_id',
    name: 'other_name',
    cnpj: 'other_cnpj'
  }
]

const makeLoadCompaniesRepository = (): LoadCompaniesRepository => {
  class LoadCompaniesRepositoryStub implements LoadCompaniesRepository {
    async loadAll(): Promise<CompanyModel[]> {
      return makeFakeCompanies()
    }
  }

  return new LoadCompaniesRepositoryStub()
}

type SutTypes = {
  sut: DbLoadCompanies
  loadCompaniesRepositoryStub: LoadCompaniesRepository
}

const makeSut = (): SutTypes => {
  const loadCompaniesRepositoryStub = makeLoadCompaniesRepository()
  const sut = new DbLoadCompanies(loadCompaniesRepositoryStub)
  return { sut, loadCompaniesRepositoryStub }
}

describe('DbLoadCompanies Usecase', () => {
  test('Should call LoadCompaniesRepository', async () => {
    const { sut, loadCompaniesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCompaniesRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of companies on success', async () => {
    const { sut } = makeSut()
    const companies = await sut.load()
    expect(companies).toEqual(makeFakeCompanies())
  })
})
