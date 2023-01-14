import { UnitModel } from '@/domain/models/unit'
import { LoadUnitsByCompany } from '@/domain/usecases/unit/load-units-by-company'
import { HttpRequest, noContent, ok, serverError, Validation } from '../../account/signup/signup-controller-protocols'
import { LoadUnitsByCompanyController } from './load-units-by-company-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
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

type SutTypes = {
  sut: LoadUnitsByCompanyController
  loadUnitsByCompanyStub: LoadUnitsByCompany
}

const makeSut = (): SutTypes => {
  const loadUnitsByCompanyStub = makeLoadUnitsByCompany()
  const sut = new LoadUnitsByCompanyController(loadUnitsByCompanyStub)

  return { sut, loadUnitsByCompanyStub }
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
})
