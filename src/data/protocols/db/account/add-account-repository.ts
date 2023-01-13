import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/account/add-acount'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
