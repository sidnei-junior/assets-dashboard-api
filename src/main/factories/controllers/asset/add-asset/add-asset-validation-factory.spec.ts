import { StatusAsset } from '@/domain/models/asset'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { EnumValueValidation } from '@/validation/validators/enum-value-validation'
import { PercentageValidation } from '@/validation/validators/percentage-validation'
import { makeAddAssetValidation } from './add-asset-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddAssetValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddAssetValidation()
    const validations: Validation[] = []
    for (const field of ['unitId', 'ownerId', 'name', 'image', 'description', 'model', 'status', 'healthLevel']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EnumValueValidation('status', StatusAsset))
    validations.push(new PercentageValidation('healthLevel'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
