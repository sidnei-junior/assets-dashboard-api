import { AddCompanyRepository } from '@/data/protocols/db/company/add-company-repository'
import { LoadCompanyByCnpjRepository } from '@/data/protocols/db/company/load-company-by-cnpj-repository'
import { CompanyModel } from '@/domain/modals/company'
import { AddCompanyModel } from '@/domain/usecases/company/add-company'
import { DbAddCompany } from './db-add-company'

const makeFakeCompany = (): CompanyModel => ({
  id: 'valid_id',
  name: 'valid_name',
  cnpj: 'valid_cnpj'
})

const makeFakeCompanyData = (): AddCompanyModel => ({
  name: 'valid_name',
  cnpj: 'valid_cnpj'
})

const makeAddCompanyRepository = (): AddCompanyRepository => {
  class AddCompanyRepositoryStub implements AddCompanyRepository {
    async add(CompanyData: AddCompanyModel): Promise<CompanyModel> {
      // eslint-disable-next-line @typescript-eslint/return-await
      return new Promise((resolve) => resolve(makeFakeCompany()))
    }
  }
  return new AddCompanyRepositoryStub()
}

const makeLoadCompanyByCnpjRepository = (): LoadCompanyByCnpjRepository => {
  class LoadCompanyByCnpjRepositoryStub implements LoadCompanyByCnpjRepository {
    async loadByCnpj(cnpj: string): Promise<CompanyModel> {
      return null
    }
  }
  return new LoadCompanyByCnpjRepositoryStub()
}

type SutTypes = {
  sut: DbAddCompany
  addCompanyRepositoryStub: AddCompanyRepository
  loadCompanyByCnpjRepositoryStub: LoadCompanyByCnpjRepository
}

const makeSut = (): SutTypes => {
  const addCompanyRepositoryStub = makeAddCompanyRepository()
  const loadCompanyByCnpjRepositoryStub = makeLoadCompanyByCnpjRepository()
  const sut = new DbAddCompany(addCompanyRepositoryStub, loadCompanyByCnpjRepositoryStub)
  return { sut, addCompanyRepositoryStub, loadCompanyByCnpjRepositoryStub }
}

describe('DbAddCompany Usecase', () => {
  test('Should call AddCompanyRepository with correct values', async () => {
    const { sut, addCompanyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCompanyRepositoryStub, 'add')
    await sut.add(makeFakeCompanyData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      cnpj: 'valid_cnpj'
    })
  })

  test('Should return a company on success', async () => {
    const { sut } = makeSut()
    const company = await sut.add(makeFakeCompanyData())
    expect(company).toEqual(makeFakeCompany())
  })

  test('Should call LoadCompanyByCnpjRespository with correct cnpj', async () => {
    const { sut, loadCompanyByCnpjRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCompanyByCnpjRepositoryStub, 'loadByCnpj')
    await sut.add(makeFakeCompanyData())
    expect(loadSpy).toHaveBeenCalledWith('valid_cnpj')
  })
})
