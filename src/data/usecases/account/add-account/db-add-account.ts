import { Hasher } from '@/data/protocols/criptography/hasher'
import { AccountModel } from '@/domain/modals/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.hasher.hash(account.password)
    return null
  }
}
