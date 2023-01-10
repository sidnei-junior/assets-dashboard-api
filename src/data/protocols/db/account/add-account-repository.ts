import { AccountModel } from '@/domain/modals/account'
import { AddAccountModel } from '@/domain/usecases/account/add-acount'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
