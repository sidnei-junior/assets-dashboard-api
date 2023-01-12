import { AddCompanyRepository } from '@/data/protocols/db/company/add-company-repository'
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

type SutTypes = {
  sut: DbAddCompany
  addCompanyRepositoryStub: AddCompanyRepository
}

const makeSut = (): SutTypes => {
  const addCompanyRepositoryStub = makeAddCompanyRepository()
  const sut = new DbAddCompany(addCompanyRepositoryStub)
  return { sut, addCompanyRepositoryStub }
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
})
