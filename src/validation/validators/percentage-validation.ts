import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class PercentageValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (input[this.fieldName] < 0 || input[this.fieldName] > 100) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
