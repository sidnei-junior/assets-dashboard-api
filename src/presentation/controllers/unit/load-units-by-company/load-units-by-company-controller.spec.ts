import { UnitModel } from '@/domain/models/unit'
import { LoadUnitsByCompany } from '@/domain/usecases/unit/load-units-by-company'
import {
  badRequest,
  HttpRequest,
  MissingParamError,
  noContent,
  notFound,
  NotFoundError,
  ok,
  serverError,
  Validation
} from '../../account/signup/signup-controller-protocols'
import { LoadUnitsByCompanyController } from './load-units-by-company-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    companyId: 'any_company_id'
  }
})

const makeLoadUnitsByCompany = (): LoadUnitsByCompany => {
  class LoadUnitsByCompanyStub implements LoadUnitsByCompany {
    async load(companyId: string): Promise<UnitModel[]> {
      return makeFakeUnits()
    }
  }

  return new LoadUnitsByCompanyStub()
}

const makeFakeUnits = (): UnitModel[] => [
  { id: 'any_id', name: 'any_name', companyId: 'any_company_id' },
  { id: 'other_id', name: 'other_name', companyId: 'any_company_id' }
]

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: LoadUnitsByCompanyController
  loadUnitsByCompanyStub: LoadUnitsByCompany
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadUnitsByCompanyStub = makeLoadUnitsByCompany()
  const validationStub = makeValidation()
  const sut = new LoadUnitsByCompanyController(loadUnitsByCompanyStub, validationStub)

  return { sut, loadUnitsByCompanyStub, validationStub }
}

describe('LoadUnitsByCompany Controller', () => {
  test('Should call LoadUnitsByCompany with correct value', async () => {
    const { sut, loadUnitsByCompanyStub } = makeSut()
    const loadSpy = jest.spyOn(loadUnitsByCompanyStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_company_id')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUnits()))
  })

  test('Should return 204 if LoadUnitsByCompany returns empty', async () => {
    const { sut, loadUnitsByCompanyStub } = makeSut()
    jest.spyOn(loadUnitsByCompanyStub, 'load').mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadUnitsByCompany throws', async () => {
    const { sut, loadUnitsByCompanyStub } = makeSut()
    jest
      .spyOn(loadUnitsByCompanyStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
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
