import { UpdateUnitRepository } from '@/data/protocols/db/unit/update-unit-repository'
import { UnitModel } from '@/domain/models/unit'
import { UpdateUnitModel } from '@/domain/usecases/unit/update-unit'
import { DbUpdateUnit } from './db-update-unit'

const makeUpdateUnitRepository = (): UpdateUnitRepository => {
  class UpdateUnitRepositoryStub implements UpdateUnitRepository {
    async update(unitData: UpdateUnitModel, id: string): Promise<UnitModel | string> {
      return makeFakeUnit()
    }
  }
  return new UpdateUnitRepositoryStub()
}

const makeFakeUnit = (): UnitModel => ({
  id: 'valid_id',
  name: 'valid_name',
  companyId: 'valid_company_id'
})

const makeFakeUnitData = (): UpdateUnitModel => ({
  name: 'valid_name',
  companyId: 'valid_company_id'
})

type SutTypes = {
  sut: DbUpdateUnit
  updateUnitRepositoryStub: UpdateUnitRepository
}

const makeSut = (): SutTypes => {
  const updateUnitRepositoryStub = makeUpdateUnitRepository()
  const sut = new DbUpdateUnit(updateUnitRepositoryStub)
  return { sut, updateUnitRepositoryStub }
}

describe('DbUpdateUnit', () => {
  test('Should call UpdateUnitRepository with correct values', async () => {
    const { sut, updateUnitRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateUnitRepositoryStub, 'update')
    await sut.update(makeFakeUnitData(), 'any_id')
    expect(updateSpy).toHaveBeenCalledWith(
      {
        name: 'valid_name',
        companyId: 'valid_company_id'
      },
      'any_id'
    )
  })

  test('Should return a unit on success', async () => {
    const { sut } = makeSut()
    const unit = await sut.update(makeFakeUnitData(), 'any_id')
    expect(unit).toEqual(makeFakeUnit())
  })
})
