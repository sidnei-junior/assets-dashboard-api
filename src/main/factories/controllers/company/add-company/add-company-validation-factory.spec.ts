import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeAddCompanyValidation } from './add-company-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddCompanyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCompanyValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'cnpj']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
