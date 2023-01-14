import { AddUnitRepository } from '@/data/protocols/db/unit/add-unit-repository'
import { UnitModel } from '@/domain/models/unit'
import { AddUnitModel } from '@/domain/usecases/unit/add-unit'
import { DbAddUnit } from './db-add-unit'

const makeFakeUnit = (): UnitModel => ({
  id: 'valid_id',
  name: 'valid_name',
  companyId: 'valid_company_id'
})

const makeFakeUnitData = (): AddUnitModel => ({
  name: 'valid_name',
  companyId: 'valid_company_id'
})

const makeAddUnitRepository = (): AddUnitRepository => {
  class AddUnitRepositoryStub implements AddUnitRepository {
    async add(UnitData: AddUnitModel): Promise<UnitModel> {
      return makeFakeUnit()
    }
  }
  return new AddUnitRepositoryStub()
}

type SutTypes = {
  sut: DbAddUnit
  addUnitRepositoryStub: AddUnitRepository
}

const makeSut = (): SutTypes => {
  const addUnitRepositoryStub = makeAddUnitRepository()
  const sut = new DbAddUnit(addUnitRepositoryStub)
  return { sut, addUnitRepositoryStub }
}

describe('DbAddUnit Usecase', () => {
  test('Should call AddUnitRepository with correct values', async () => {
    const { sut, addUnitRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUnitRepositoryStub, 'add')
    await sut.add(makeFakeUnitData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      companyId: 'valid_company_id'
    })
  })
})
