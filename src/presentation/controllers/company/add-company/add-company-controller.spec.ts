import { CompanyModel } from '@/domain/modals/company'
import { AddCompany, AddCompanyModel } from '@/domain/usecases/company/add-company'
import { CnpjInUseError } from '@/presentation/errors/cnpj-in-use-error'
import { HttpRequest, Validation } from '../../account/login/login-controller-protocols'
import {
  badRequest,
  forbidden,
  MissingParamError,
  noContent,
  ok,
  ServerError,
  serverError
} from '../../account/signup/signup-controller-protocols'
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

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: AddCompanyController
  addCompanyStub: AddCompany
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addCompanyStub = makeAddCompany()
  const validationStub = makeValidation()
  const sut = new AddCompanyController(addCompanyStub, validationStub)
  return { sut, addCompanyStub, validationStub }
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

  test('Should return 403 if AddCompany returns null', async () => {
    const { sut, addCompanyStub } = makeSut()
    jest.spyOn(addCompanyStub, 'add').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new CnpjInUseError()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
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
