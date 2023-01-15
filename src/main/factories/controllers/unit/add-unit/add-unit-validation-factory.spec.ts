import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeAddUnitValidation } from './add-unit-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddUnitValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddUnitValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'companyId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
