import { UnitModel } from '@/domain/models/unit'
import { AddUnit, AddUnitModel } from '@/domain/usecases/unit/add-unit'
import { HttpRequest } from '../../account/login/login-controller-protocols'
import { AddUnitController } from './add-unit-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    companyId: 'any_company_id'
  }
})

const makeAddUnit = (): AddUnit => {
  class AddUnitStub implements AddUnit {
    async add(unitData: AddUnitModel): Promise<UnitModel> {
      return makeFakeUnit()
    }
  }

  return new AddUnitStub()
}

const makeFakeUnit = (): UnitModel => ({
  id: 'any_id',
  name: 'any_name',
  companyId: 'any_company_id'
})

type SutTypes = {
  addUnitStub: AddUnit
  sut: AddUnitController
}

const makeSut = (): SutTypes => {
  const addUnitStub = makeAddUnit()
  const sut = new AddUnitController(addUnitStub)
  return { sut, addUnitStub }
}

describe('AddUnit Controller', () => {
  test('Should call AddUnit with correct values', async () => {
    const { sut, addUnitStub } = makeSut()
    const addSpy = jest.spyOn(addUnitStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      companyId: 'any_company_id'
    })
  })
})
