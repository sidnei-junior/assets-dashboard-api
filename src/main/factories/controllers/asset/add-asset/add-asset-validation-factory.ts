import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EnumValueValidation } from '@/validation/validators/enum-value-validation'
import { PercentageValidation } from '@/validation/validators/percentage-validation'
import { StatusAsset } from '@/domain/models/asset'

export const makeAddAssetValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['unitId', 'ownerId', 'name', 'image', 'description', 'model', 'status', 'healthLevel']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EnumValueValidation('status', StatusAsset))
  validations.push(new PercentageValidation('healthLevel'))
  return new ValidationComposite(validations)
}
