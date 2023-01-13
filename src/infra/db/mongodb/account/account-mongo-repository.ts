/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/indent */
import { ObjectId } from 'mongodb'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/uptade-access-token-repository'
import { AddAccountModel } from '@/domain/usecases/account/add-acount'
import { AccountModel } from '@/domain/models/account'
import { MongoHelper } from '../helper/mongo-helper'

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository
{
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const { insertedId: id } = result
    const accountById = await accountCollection.findOne({ _id: id })
    const account = MongoHelper.map(accountById)
    return account
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accountByEmail = await accountCollection.findOne({ email })
    const account = accountByEmail && MongoHelper.map(accountByEmail)
    return account
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }

  async loadByToken(token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accountByToken = await accountCollection.findOne({
      accessToken: token,
      $or: [
        {
          role
        },
        {
          role: 'admin'
        }
      ]
    })
    const account = accountByToken && MongoHelper.map(accountByToken)
    return account
  }
}
