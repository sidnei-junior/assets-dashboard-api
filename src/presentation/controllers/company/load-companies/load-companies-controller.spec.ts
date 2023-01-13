import { CompanyModel } from '@/domain/models/company'
import { LoadCompanies } from '@/domain/usecases/company/load-companies'
import { LoadCompaniesController } from './load-companies-controller'

const makeLoadCompanies = (): LoadCompanies => {
  class LoadCompaniesStub implements LoadCompanies {
    async load(): Promise<CompanyModel[]> {
      return makeFakeCompanies()
    }
  }

  return new LoadCompaniesStub()
}

const makeFakeCompanies = (): CompanyModel[] => {
  return [
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
}

type SutTypes = {
  sut: LoadCompaniesController
  loadCompaniesStub: LoadCompanies
}

const makeSut = (): SutTypes => {
  const loadCompaniesStub = makeLoadCompanies()
  const sut = new LoadCompaniesController(loadCompaniesStub)
  return { sut, loadCompaniesStub }
}

describe('LoadCompanies Controller', () => {
  test('Should call LoadCompanies', async () => {
    const { sut, loadCompaniesStub } = makeSut()
    const loadSpy = jest.spyOn(loadCompaniesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
