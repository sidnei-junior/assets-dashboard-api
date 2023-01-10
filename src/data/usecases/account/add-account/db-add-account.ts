import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { AccountModel } from '@/domain/modals/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const newAccount = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return newAccount
  }
}
