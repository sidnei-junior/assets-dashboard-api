import { AccountModel } from '@/domain/modals/account'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
