import { CompanyModel } from '@/domain/modals/company'
import { AddCompany, AddCompanyModel } from '@/domain/usecases/company/add-company'
import { HttpRequest } from '../../account/login/login-controller-protocols'
import { ServerError, serverError } from '../../account/signup/signup-controller-protocols'
import { AddCompanyController } from './add-company-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    cnpj: 'any_cnpj'
  }
})

const makeAddCompany = (): AddCompany => {
  class AddCompanyStub implements AddCompany {
    async add(companyData: AddCompanyModel): Promise<CompanyModel> {
      return makeFakeCompany()
    }
  }

  return new AddCompanyStub()
}

const makeFakeCompany = (): CompanyModel => ({
  id: 'any_id',
  name: 'any_name',
  cnpj: 'any_cnpj'
})

type SutTypes = {
  sut: AddCompanyController
  addCompanyStub: AddCompany
}

const makeSut = (): SutTypes => {
  const addCompanyStub = makeAddCompany()
  const sut = new AddCompanyController(addCompanyStub)
  return { sut, addCompanyStub }
}

describe('AddCompany Controller', () => {
  test('Should call AddCompany with correct values', async () => {
    const { sut, addCompanyStub } = makeSut()
    const addSpy = jest.spyOn(addCompanyStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      cnpj: 'any_cnpj'
    })
  })

  test('Should return 500 if AddCompany throws', async () => {
    const { sut, addCompanyStub } = makeSut()
    jest.spyOn(addCompanyStub, 'add').mockImplementationOnce(async () => {
      // eslint-disable-next-line @typescript-eslint/return-await
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
