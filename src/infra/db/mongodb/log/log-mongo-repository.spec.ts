import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'
import { LogMongoRepository } from './log-mongo-repository'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })
  test('Should create an error log on success', async () => {
    const sut = makeSut()
    console.log('🚀 ~ file: log-mongo-repository.spec.ts:26 ~ test ~ sut', sut)
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    console.log('🚀 ~ file: log-mongo-repository.spec.ts:29 ~ test ~ errorCollection', errorCollection)
    console.log('🚀 ~ file: log-mongo-repository.spec.ts:29 ~ test ~ count', count)
    expect(count).toBe(1)
  })
})
