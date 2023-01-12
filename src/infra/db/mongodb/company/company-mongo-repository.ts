import { AddCompanyRepository } from '@/data/protocols/db/company/add-company-repository'
import { CompanyModel } from '@/domain/modals/company'
import { AddCompanyModel } from '@/domain/usecases/company/add-company'
import { MongoHelper } from '../helper/mongo-helper'

export class CompanyMongoRepository implements AddCompanyRepository {
  async add(companyData: AddCompanyModel): Promise<CompanyModel> {
    const companyCollection = await MongoHelper.getCollection('companies')
    const result = await companyCollection.insertOne(companyData)
    const { insertedId: id } = result
    const companyById = await companyCollection.findOne({ _id: id })
    const company = MongoHelper.map(companyById)
    return company
  }
}
