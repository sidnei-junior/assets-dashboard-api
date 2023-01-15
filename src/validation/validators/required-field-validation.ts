import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    let fieldValue = input[this.fieldName]
    if (typeof fieldValue === 'number') {
      fieldValue = fieldValue + ''
    }
    if (!fieldValue) {
      return new MissingParamError(this.fieldName)
    }
  }
}
